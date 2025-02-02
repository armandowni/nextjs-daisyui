import { ActionButton } from "@/components/shared/button";
import {
  DeleteModalComponent,
  ModalComponent,
  useFormDialog,
} from "@/components/shared/modal";
import { Table } from "@/components/shared/table";
import { DEFAULT_COLUMNS_TEST } from "@/model/test/const";
import {
  TEST_ADD,
  TEST_DELETE,
  TEST_EDIT,
  emitTestReload,
} from "@/model/test/signal";
import { dataTestTable$ } from "@/model/test/state";
import { useObservable } from "@/util/async";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, Field, ITableSettings } from "@tinqjs/tinjs-tw";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const TableTest = () => {
  const { add, edit, deleteData, isOpen, isOpenDelete, close, dataForm } =
    useFormDialog();

  const { handleSubmit, register, setValue } = useForm();
  const [dataTest] = useObservable(dataTestTable$, null as any);

  useEffect(() => emitTestReload({}), []);

  const clearForm = (data?: any) => {
    setValue("name", data?.name || null);
    setValue("age", data?.age || null);
  };

  useEffect(() => {
    // console.log(dataForm);

    if (!dataForm) return clearForm();

    clearForm(dataForm);
  }, [dataForm]);

  const settings: ITableSettings = {
    features: {
      action: {
        formatter: (_, item) =>
          (item.status & 4) == 4 ? (
            <div className="flex items-center gap-3">
              <ActionButton
                icon={faPencilAlt}
                onClick={() => edit(item)}
              ></ActionButton>
              <ActionButton
                icon={faTrash}
                onClick={() => deleteData(item)}
              ></ActionButton>
            </div>
          ) : null,
      },
      status: {
        formatter: (_, item) =>
          (item.status & 2) == 2
            ? "Nuxt App 3"
            : (item.status & 1) == 1
            ? "Nuxt App 2"
            : (item.status & 4) == 4
            ? "Nextjs App"
            : (item.status & 8) == 8
            ? "Reactjs-Generouted App"
            : "Unknown",
      },
    },
  };

  return (
    <div className="mt-5 bg-white shadow sm:rounded-lg p-0 md:px-5 py-2 w-full">
      <div className="font-bold text-2xl pb-3 px-3 lg:px-0 text-black">
        Here the example
      </div>
      <div className="w-full border-0 md:border-2 rounded-md p-5">
        <Button
          className="bg-blue-600 rounded-md text-white px-5 py-2 mb-5 text-sm"
          onClick={() => {
            add();
            clearForm();
          }}
        >
          Add Data
        </Button>
        <ModalComponent isOpen={isOpen} onClose={close}>
          <div className="flex flex-col justify-center items-center gap-2 w-22">
            <span className="text-2xl text-black">Form</span>
            {/* <span className="text-red-500">{{ errorMessage }}</span> */}
            <form
              className="flex flex-col gap-10 text-black"
              onSubmit={handleSubmit((data) => {
                close();
                return dataForm
                  ? TEST_EDIT({ ...dataForm, ...data })
                  : TEST_ADD({ ...data });
              })}
            >
              <div className="flex flex-col gap-3">
                <Field label={"Name"} required="true">
                  <input
                    className="x-input"
                    type="text"
                    {...register("name", { required: true })}
                  />
                </Field>
                <Field label="Age" required="true">
                  <input
                    className="x-input"
                    type="number"
                    {...register("age", { required: true })}
                  />
                </Field>
              </div>

              <div className="flex gap-10" id="buttons">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-xl"
                  type="button"
                  onClick={() => {
                    setValue("name", null);
                    setValue("age", null);
                    close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </ModalComponent>
        <DeleteModalComponent
          isOpen={isOpenDelete}
          onClose={() => {
            setValue("name", null);
            setValue("age", null);
            close();
          }}
          message={`Are you sure want to delete ${dataForm?.name}?`}
          data={dataForm}
          onDelete={TEST_DELETE}
        />

        <Table
          data={
            dataTest
              ? dataTest?.sort((a: any, b: any) => {
                  const aStatus = (a.status & 4) === 4 ? 1 : 0;
                  const bStatus = (b.status & 4) === 4 ? 1 : 0;
                  return bStatus - aStatus;
                })
              : []
          }
          count={dataTest?.length || 0}
          settings={settings}
          default_columns={DEFAULT_COLUMNS_TEST}
          limit={25}
          isResponsive={true}
          isPaging={false}
          onChange={(pageIndex) => {}}
        ></Table>
      </div>
    </div>
  );
};
