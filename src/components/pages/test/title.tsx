const Daisy = () => (
  <div className="font-bold text-transparent text-4xl lg:text-8xl bg-clip-text bg-gradient-to-br from-red-500 to-red-700">
    DAISY UI
  </div>
);

const Next = () => (
  <div className="font-bold text-transparent text-4xl lg:text-8xl bg-clip-text bg-gradient-to-br from-gray-400 to-black">
    NEXT JS
  </div>
);

export const TestTitle = () => (
  <div id="header" className="flex flex-col justify-center pt-8 sm:pt-0">
    <span className="text-center font-extrabold text-xl">
      Template project with
    </span>
    <div className="flex flex-col lg:flex-row justify-center items-center gap-0 lg:gap-2">
      <a
        className="flex justify-center sm:pt-0"
        href="https://nextjs.org"
        target="_blank"
      >
        <Next />
      </a>
      <span className="text-6xl">+</span>
      <a
        className="flex justify-center sm:pt-0"
        href="https://daisyui.com/"
        target="_blank"
      >
        <Daisy />
      </a>
    </div>
  </div>
);
