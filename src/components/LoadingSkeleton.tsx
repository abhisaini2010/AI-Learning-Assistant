interface Props {
  darkMode: boolean;
}

const LoadingSkeleton = ({
  darkMode,
}: Props) => {
  const skeletonClass = darkMode
    ? "bg-slate-600"
    : "bg-slate-200";

  return (
    <div className="space-y-4 animate-pulse">
      <div className={`h-6 rounded w-3/4 ${skeletonClass}`} />
      <div className={`h-4 rounded ${skeletonClass}`} />
      <div className={`h-4 rounded w-5/6 ${skeletonClass}`} />
      <div className={`h-4 rounded w-2/3 ${skeletonClass}`} />
      <div className={`h-6 rounded w-1/2 mt-6 ${skeletonClass}`} />
      <div className={`h-4 rounded ${skeletonClass}`} />
      <div className={`h-4 rounded w-4/5 ${skeletonClass}`} />
      <div className={`h-4 rounded w-3/5 ${skeletonClass}`} />
    </div>
  );
};

export default LoadingSkeleton;