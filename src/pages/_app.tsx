import "./index.css";
import { TestTitle } from "@/components/pages/test/title";
import { TableTest } from "@/components/pages/test/table";

export default function App({ Component, pageProps }: any) {
  const getLayout = Component?.getLayout ?? ((page) => page);
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
