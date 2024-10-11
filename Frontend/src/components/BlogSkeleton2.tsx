export const BlogSkeleton2=()=>{
return(
<div>
<div className="flex justify-center">
  <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
    {/* Left Side (Blog content skeleton) */}
    <div className="col-span-8">
      <div className="h-12 bg-slate-200 rounded w-3/4 mb-4 animate-pulse"></div>
      <div className="h-4 bg-slate-200 rounded w-1/4 mb-6 animate-pulse"></div>
      <div className="space-y-4">
        <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
      </div>
    </div>

    {/* Right Side (Author info skeleton) */}
    <div className="col-span-4">
      <div className="h-6 bg-slate-200 rounded w-1/4 mb-4 animate-pulse"></div>
      <div className="flex">
        <div className="pr-4 flex flex-col justify-center">
          <div className="h-16 w-16 bg-slate-200 rounded-full animate-pulse"></div>
        </div>
        <div>
          <div className="h-6 bg-slate-200 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
</div>



</div>




)




}