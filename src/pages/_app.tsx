import "./index.css";
import { TestTitle } from "@/components/pages/test/title";
import { TableTest } from "@/components/pages/test/table";
import { testListeners$ } from "@/model/test/signal";
import { merge } from "rxjs";

export default function App({ Component, pageProps }: any) {
  const getLayout = Component?.getLayout ?? ((page) => page);

  merge(testListeners$).subscribe({
    next: (result) => (result ? console.log() : null),
    error: (err) => console.log(err?.message),
    complete: () => console.log(),
  });
  return (
    <div className="p-10 h-screen">
      {getLayout(
        <>
          <TestTitle />
          <TableTest />
        </>
      )}
    </div>
  );
}
