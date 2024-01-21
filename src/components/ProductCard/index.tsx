import React from "react";
import dayjs from "dayjs";
import { DateRange, Edit } from "@mui/icons-material";
import { Button, Snackbar, Alert } from "@mui/material/";
import CustomDialog from "@/components/CustomDialog";
import { useDeleteProductMutation } from "@/store/apiSlice";
import EditOrCreateCard from "./EditOrCreateCard";
import { formatCurrency } from "@/helpers/currencyFormatter";

const ProductCard = ({
  data,
  formMethods,
  edit,
  setEdit,
  allCategories,
}: any) => {
  const { reset, clearErrors } = formMethods;
  const [deleteProductId, setDeleteProductId] = React.useState<number | null>(
    null
  );
  const [editProduct, setEditProduct] = React.useState<boolean>(false);
  const [successDelete, setSuccessDelete] = React.useState<boolean>(false);
  const [successEdit, setSuccessEdit] = React.useState<boolean>(false);

  const [deleteProduct] = useDeleteProductMutation();

  const handleClick = () => {
    setEdit(data.id);
    reset({ editName: "" });
    clearErrors("editName");
  };

  React.useEffect(() => {
    setEditProduct(edit === data.id);
  }, [edit, data.id]);

  return (
    <>
      <div
        key={data.id}
        className="flex rounded-lg items-center w-1/5 box-border p-4 flex-col min-h-60 justify-center gap-5 shadow-card min-w-72 max-sm:w-full max-md:w-custom"
      >
        <Snackbar
          open={successEdit}
          autoHideDuration={3000}
          onClose={() => setSuccessEdit(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSuccessEdit(false)}
            severity="info"
            sx={{ width: "100%" }}
          >
            Ürün başarıyla düzenlendi.
          </Alert>
        </Snackbar>
        <h2 className="text-xl font-bold flex gap-4">
          {data.productName}
          <Button variant="outlined" onClick={handleClick}>
            <Edit />
          </Button>
        </h2>
        {edit === data.id && (
          <CustomDialog
            open={editProduct}
            title="Ürün Bilgilerini Güncelle"
            message={
              <div>
                Ürün Değişikliği İçin Yeni Bilgilerini Aşağıya Yazınız.
                <EditOrCreateCard
                  edit={edit}
                  allCategories={allCategories}
                  closeDialog={setEditProduct}
                  setSuccessCreate={setSuccessEdit}
                  formMethods={formMethods}
                  type="edit"
                />
              </div>
            }
            onClose={() => {
              setEdit(false);
              reset({ createName: "" });
              clearErrors("createName");
            }}
          />
        )}
        <span>
          <DateRange />
          {dayjs(data.createdDate).format("DD MMMM YYYY HH:mm")}
        </span>
        <div>Stok {data.stock} Adet</div>
        <div>Tutar: {formatCurrency(data.price)}</div>
        <Button
          variant="contained"
          color="error"
          className="bg-mui-red w-1/2"
          type="submit"
          onClick={() => {
            setDeleteProductId(data.id);
          }}
        >
          Sil
        </Button>
      </div>
      <CustomDialog
        open={deleteProductId === data.id}
        title="Silmek İstediğinize Emin Misiniz ?"
        message={`Seçtiğiniz Ürün Tamamen Silinecektir ve Bir Daha Asla Geri Getirilemeyecektir. Seçtiğiniz Ürün İsmi : ${data.productName}`}
        onClose={() => {
          setDeleteProductId(null);
        }}
        handleOnSubmit={() => {
          deleteProduct({ id: data.id });
          setSuccessDelete(true);
        }}
      />
      <Snackbar
        open={successDelete}
        autoHideDuration={3000}
        onClose={() => setSuccessDelete(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSuccessDelete(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Ürün başarıyla silindi.
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;
