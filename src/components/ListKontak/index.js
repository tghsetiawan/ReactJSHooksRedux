import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteKontak, detailKontak, getListKontak } from "../../actions/kontakAction";
// import kontak from "../../reducers/kontak";

function ListKontak() {
  const {
    getListKontakResult,
    getListKontakLoading,
    getListKontakError,
    deleteKontakResult,
  } = useSelector((state) => state.kontakReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    //get list kontak
    //panggil action getListKontak
    dispatch(getListKontak());
  }, [dispatch]);

  useEffect(() => {
    if (deleteKontakResult) {
      dispatch(getListKontak());
    }
  }, [deleteKontakResult, dispatch]);

  return (
    <div>
      <h3>List Kontak</h3>
      {getListKontakResult ? (
        getListKontakResult.map((kontak) => {
          return (
            <p key={kontak.id}>
              {kontak.nama} -{kontak.nohp} -
              <button style={{margin: '5px'}} onClick={() => dispatch(deleteKontak(kontak.id))}>
                Hapus
              </button>
              <button style={{margin: '5px'}} onClick={() => dispatch(detailKontak(kontak))}>Edit</button>
            </p>
          );
        })
      ) : getListKontakLoading ? (
        <p>Loading . . .</p>
      ) : (
        <p>{getListKontakError ? getListKontakError : 'Data Kosong'}</p>
      )}
    </div>
  );
}

export default ListKontak;
