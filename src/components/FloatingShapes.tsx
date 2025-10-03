const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Top left abstract shape */}
      <div 
        className="floating-shape top-20 left-10 w-32 h-32"
        style={{
          background: `url('/lovable-uploads/87fbf401-76a8-4d5e-82cd-697d38f573f3.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          animationDelay: '0s'
        }}
      />
      
      {/* Top right circular shape */}
      <div 
        className="floating-shape top-32 right-20 w-24 h-24"
        style={{
          background: `url('/lovable-uploads/36fcc320-e88f-440f-9541-1c3920905aee.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          animationDelay: '2s'
        }}
      />
      
      {/* Bottom left oval shape */}
      <div 
        className="floating-shape bottom-40 left-20 w-28 h-28"
        style={{
          background: `url('/lovable-uploads/3b0dc14e-718b-4fba-b78f-6af00fc073eb.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-preference',
          animationDelay: '4s'
        }}
      />
      
      {/* Bottom right star shape */}
      <div 
        className="floating-shape bottom-20 right-10 w-36 h-36"
        style={{
          background: `url('/lovable-uploads/f36b2a68-5716-4c05-9ef1-f2c41e816df2.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          animationDelay: '1s'
        }}
      />
      
      {/* Additional smaller shapes for richness */}
      <div className="floating-shape top-1/2 left-1/4 w-6 h-6 bg-primary/10 rounded-full" style={{ animationDelay: '3s' }} />
      <div className="floating-shape top-1/3 right-1/3 w-8 h-8 bg-primary/5 rounded-lg" style={{ animationDelay: '5s' }} />
    </div>
  );
};

export default FloatingShapes;