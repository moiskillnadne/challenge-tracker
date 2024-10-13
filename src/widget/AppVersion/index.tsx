export const AppVersion = () => {
  const appVersion = import.meta.env.VITE_APP_VERSION ?? 'v0.0.0';

  return (
    <div className="absolute left-0 bottom-0 text-white/50 p-[12px] text-[10px] cursor-default">
      {appVersion}
    </div>
  );
};
