const BackgroundEffect = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* First gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/90 to-pink-60070 blur-3xl animate-pulse" />
  
      {/* Second gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-tr  from-pink-800/90 to-red-800/60 via-transparent  blur-2xl animate-float" />
    </div>
  );
  
  export default BackgroundEffect;
  