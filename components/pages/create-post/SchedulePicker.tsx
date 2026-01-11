"use client";

import * as React from "react";
import { ChevronDownIcon, Loader, Calendar as CalendarIcon, Clock, Sparkles } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  toggleModal: (value: boolean) => void;
  handleSchedule: (data: any) => Promise<void>;
  loading: boolean;
};

export function SchedulePicker({
  toggleModal,
  handleSchedule,
  loading,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState("10:30");

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold tracking-tight">Schedule Publication</h3>
        <p className="text-sm text-muted-foreground">Set the date and time for your post to go live.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Date Selection */}
        <div className="flex-1 space-y-2.5">
          <Label htmlFor="date-picker" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
            Publish Date
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                className={cn(
                  "w-full justify-start text-left font-normal h-11 rounded-xl border-muted-foreground/20 hover:bg-muted/50 transition-all",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                {date ? format(date, "PPP") : "Pick a date"}
                <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 rounded-2xl shadow-2xl border-muted-foreground/10"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                initialFocus
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Selection */}
        <div className="w-full sm:w-[140px] space-y-2.5">
          <Label htmlFor="time-picker" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
            Time (UTC)
          </Label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-70" />
            <Input
              type="time"
              id="time-picker"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="h-11 pl-9 rounded-xl border-muted-foreground/20 focus-visible:ring-primary/20 bg-background"
            />
          </div>
        </div>
      </div>

      {/* NEW: Selection Summary & Hope Message */}
      {date && (
        <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                Selected: <span className="text-primary">{format(date, "MMMM dd, yyyy")}</span> at <span className="text-primary">{time}</span>
              </p>
              <p className="text-xs text-muted-foreground italic">
                “Great things take time. May this post reach the right audience and spark incredible conversations.”
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          variant="ghost"
          className="flex-1 rounded-xl h-11"
          onClick={() => toggleModal(false)}
        >
          Cancel
        </Button>
        <Button
          className="flex-[2] rounded-xl h-11 bg-primary shadow-lg shadow-primary/20 transition-all active:scale-95"
          disabled={!date || loading}
          onClick={async () => {
            await handleSchedule({ date, time });
            toggleModal(false);
          }}
        >
          {loading ? (
            <Loader className="animate-spin h-4 w-4 mr-2" />
          ) : (
            "Confirm Schedule"
          )}
        </Button>
      </div>
    </div>
  );
}