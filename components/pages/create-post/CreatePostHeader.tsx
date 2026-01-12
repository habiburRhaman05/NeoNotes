import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu'
import { 
  ChevronDown, 
  Send, 
  Clock, 
  FileText, 
  RotateCcw, 
  Eye, 
  X,
  Loader2,
  CloudUpload
} from 'lucide-react'
import { SchedulePicker } from './SchedulePicker'

type Props = {
  handlePublish: (data: any) => Promise<void>
  handleSaveDraft: (data: any) => Promise<void>
  handleSchedule: (data: any) => Promise<void>
  handleReset: () => void
  togglePreview: (value:boolean) => void
  loading: {
    publish: boolean
    draft: boolean
    schedule: boolean
  }
}

const CreatePostHeader = ({
  handlePublish,
  handleSaveDraft,
  handleReset,
  togglePreview,
  handleSchedule,
  loading
}: Props) => {
  const [showScheduleSetModal, setShowScheduleSetModal] = useState(false);
  const toggleModal = (value: boolean) => setShowScheduleSetModal(value)

  return (
    <>
      {/* 1. PUBLISH LOADING OVERLAY */}
      {loading.publish && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/60 backdrop-blur-md animate-in fade-in duration-500">
          <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-card border shadow-2xl">
            <div className="relative">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <div className="absolute inset-0 blur-xl bg-primary/20 animate-pulse" />
            </div>
            <div className="text-center space-y-1">
              <p className="font-semibold text-lg tracking-tight">Publishing your masterpiece</p>
              <p className="text-sm text-muted-foreground">This will only take a moment...</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. SCHEDULE MODAL OVERLAY */}
      {showScheduleSetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative bg-background p-6 rounded-xl border shadow-2xl w-full max-w-md scale-in-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-4 rounded-full hover:bg-muted"
              onClick={() => setShowScheduleSetModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <SchedulePicker 
            loading={loading.schedule}
            handleSchedule={handleSchedule} toggleModal={toggleModal} />
          </div>
        </div>
      )}

      {/* 3. MAIN HEADER */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md px-6 py-3">
        <div className="flex items-center md:flex-row flex-col space-y-6 md:space-y-0 justify-between max-w-7xl mx-auto">
          
   {/* Left Side: STYLED TITLE */}
          <div className="flex items-center gap-3">
            {/* Creative Session Indicator */}
            <div className="flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <div className="absolute h-2 w-2 rounded-full bg-primary/40 animate-ping" />
            </div>

            <div className="flex flex-col">
                <h1 className="text-sm font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
                    Write your next masterpiece
                </h1>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.2em] leading-none mt-1">
                    Creative Editor
                </p>
            </div>
          </div>

          {/* Right Side: Actions + Draft Loading */}
          <div className="flex items-center gap-3">
            
            {/* Unique Draft Loading Indicator */}
            {loading.draft && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 animate-in slide-in-from-right-2">
                    <CloudUpload className="h-3.5 w-3.5 text-blue-500 animate-bounce" />
                    <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 uppercase tracking-tight">Saving...</span>
                </div>
            )}

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReset} 
              disabled={loading.publish || loading.draft}
              className="text-muted-foreground hover:text-destructive transition-colors hidden sm:flex"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={()=> togglePreview(true)} 
              disabled={loading.publish}
              className="hover:bg-secondary/50 transition-all border-border/60"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  disabled={loading.publish || loading.draft}
                  className="bg-primary text-primary-foreground shadow-lg hover:shadow-primary/20 transition-all duration-300 active:scale-95"
                >
                  Publish
                  <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 shadow-2xl border-muted-foreground/10">
                <DropdownMenuItem 
                  className="py-3 cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-950/30" 
                  onClick={() => handlePublish(true)}
                >
                  <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg mr-3">
                    <Send className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">Publish Now</span>
                    <span className="text-[11px] text-muted-foreground">Go live immediately</span>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  className="py-3 cursor-pointer focus:bg-amber-50 dark:focus:bg-amber-950/30"
                  disabled={loading.draft}
                  onClick={() => handleSaveDraft({})}
                >
                  <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-lg mr-3">
                    {loading.draft ? (
                      <Loader2 className="h-4 w-4 text-amber-600 animate-spin" />
                    ) : (
                      <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">Save as Draft</span>
                    <span className="text-[11px] text-muted-foreground">Keep editing later</span>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="my-2" />
                
                <DropdownMenuItem 
                  className="py-3 cursor-pointer focus:bg-purple-50 dark:focus:bg-purple-950/30"
                  onClick={() => setShowScheduleSetModal(true)}
                >
                  <div className="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-lg mr-3">
                    <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">Schedule Post</span>
                    <span className="text-[11px] text-muted-foreground">Pick a future date</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  )
}

export default CreatePostHeader