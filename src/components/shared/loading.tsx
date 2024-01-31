export default function Loading({
  className,
  isShow,
  children,
}: {
  className?: string;
  isShow?: boolean;
  children?: any;
}) {
  // console.log(isShow);
  
  return !!isShow ? (
    <div className="relative flex justify-center py-5">
      <div
        className={`${className} border-gray-300 animate-spin rounded-full border-8 border-t-blue-600`}
      />
    </div>
  ) : (
    children
  );
}

export function LoadingAction({
  className,
  isShow,
  children,
}: {
  className?: string;
  isShow?: boolean;
  children?: any;
}) {
  return !!isShow ? (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 rounded-full animate-pulse bg-blue-500"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-blue-500"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-blue-500"></div>
    </div>
  ) : (
    children
  );
}
