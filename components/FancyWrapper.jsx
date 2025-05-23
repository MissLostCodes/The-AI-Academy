export default function FancyWrapper({ children }) {
    return (      
      <div className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 p-[2px] rounded-xl">
        {children}
      </div>
    );
  }

  //