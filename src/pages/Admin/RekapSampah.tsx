// import React from "react";

const RekapSampah = () => {
  return (
    <>
      <div className="p-5 w-full">
        <span className="text-3xl font-bold">Rekap Bank Sampah</span>
        <div className="divider divider-warning"></div>
        <div className="flex gap-2 justify-end items-end">
          <label className="form-control w-md">
            <span className="label-text">Jenis Sampah</span>
            <select className="select select-bordered w-md">
              <option>Semua</option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </label>
          <label className="form-control w-md">
            <span className="label-text">Kelas</span>
            <select className="select select-bordered w-md">
              <option>Semua</option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </label>
          <label className="form-control w-md">
            <span className="label-text">Dari</span>
            <input
              type="date"
              placeholder="Type here"
              className="input input-bordered w-md"
            />
          </label>
          <label className="form-control w-md">
            <span className="label-text">Sampai</span>
            <input
              type="date"
              placeholder="Type here"
              className="input input-bordered w-md"
            />
          </label>

          <button className="btn btn-ghost bg-blue-500 text-white hover:bg-blue-400">
            Eksport Data
          </button>
        </div>
        <div className="w-full bg-white p-3 rounded-md mt-5">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr className="bg-blue-400">
                  <th>No</th>
                  <th>Nama</th>
                  <th>Kelas</th>
                  <th>Jenis Sampah</th>
                  <th>Tanggal Timbang</th>
                  <th>Total (gram)</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>9</td>
                  <td>Botol</td>
                  <td>2 juni 2024</td>
                  <td>240</td>
                  {/* <td>240</td> */}
                </tr>
              </tbody>
            </table>
          </div>
            <div className="w-full flex justify-end mt-5">
              <div className="join grid grid-cols-2 w-1/6 ">
                <button className="join-item btn btn-sm btn-outline">
                  Previous page
                </button>
                <button className="join-item btn btn-sm btn-outline">
                  Next
                </button>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default RekapSampah;
