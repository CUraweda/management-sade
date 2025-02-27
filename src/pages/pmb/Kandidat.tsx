import { useEffect, useState } from "react";
import Header from "../../Component/Header";
import Swal from "sweetalert2";
import { AttachmentApi, CandidateApi } from "../../midleware/PmbApi";
import PaginationBar, { IpageMeta } from "../../Component/PaginationBar";
import Search from "../../Component/Form/Search";
import { formatTime, getAge } from "../../utils/Date";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark, FaEye, FaFile } from "react-icons/fa6";
import Select from "../../Component/Form/Select";
import Options, { Option } from "../../data/Options";
import { Dialog, useDialog } from "../../Component/Dialog";

const approvedOptions: Option[] = [
  {
    label: "Disetujui",
    value: "Y",
  },
  {
    label: "Tidak disetujui",
    value: "N",
  },
];

const graduatedOptions: Option[] = [
  {
    label: "Lulus",
    value: "Y",
  },
  {
    label: "Tidak lulus",
    value: "N",
  },
];

const Kandidat = () => {
  const { openDialog } = useDialog();
  const dialogListAttachments = "list-attacments";
  const dialogDetailCandidate = "detail-candidate";

  const [filter, setFilter] = useState<any>({
    search_query: "",
    approved: "",
    is_graduated: "",
    page: 0,
    limit: 0,
  });

  const [data, setData] = useState<any>(null);
  const [dataList, setDataList] = useState<any[]>([]);
  const [paginate, setPaginate] = useState<IpageMeta>({ page: 0, limit: 0 });
  const getDataList = async () => {
    try {
      const res = await CandidateApi.showAll({
        ...filter,
      });
      const { result, ...data } = res.data.data;

      setDataList(result ?? []);
      setPaginate(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil daftar kandidat",
      });
    }
  };

  useEffect(() => {
    getDataList();
  }, [filter]);

  const [attachments, setAttachments] = useState<any[]>([]);
  const getAttachments = async () => {
    if (!data?.id) return;

    try {
      const res = await AttachmentApi.showAllByCandidate(data.id);
      setAttachments(res.data.data ?? []);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil lampiran kandidat",
      });
    }
  };
  useEffect(() => {
    setAttachments([]);
    if (data) getAttachments();
  }, [data]);

  return (
    <>
      <Header links={[{ l: "PMB" }]} title="Kandidat" />

      <Dialog
        title={"Lampiran " + (data?.full_name ?? "")}
        onClose={() => setAttachments([])}
        id={dialogListAttachments}
      >
        {attachments.map((dat, i) => (
          <div className="mb-4 border-b flex p-4" key={i}>
            <div className="grow">
              <p className="text-base">{dat.attachment_type ?? ""}</p>
              <span className="text-base-content/70">
                {dat.mime_type ?? ""}
              </span>
            </div>
            <div
              className="btn  btn-square btn-sm join-item tooltip flex"
              data-tip="Lihat"
            >
              <FaEye />
            </div>
          </div>
        ))}
      </Dialog>

      <Dialog
        title="Detail siswa"
        onClose={() => setData(null)}
        id={dialogDetailCandidate}
      >
        <table className="table">
          <tbody>
            <tr>
              <td>NISN</td>
              <td>: {data?.nisn ?? ""}</td>
            </tr>
            <tr>
              <td>Nama</td>
              <td>: {data?.full_name ?? ""}</td>
            </tr>
            <tr>
              <td>Nama Panggilan</td>
              <td>: {data?.nick_name ?? ""}</td>
            </tr>
            <tr>
              <td>Jenis Kelamin</td>
              <td>: {data?.gender ?? ""}</td>
            </tr>
            <tr>
              <td>Tanggal Lahir</td>
              <td>: {formatTime(data?.dob ?? "", "dddd, DD MMM YYYY")}</td>
            </tr>
            <tr>
              <td>Tempat Lahir</td>
              <td>: {data?.pob ?? ""}</td>
            </tr>
            <tr>
              <td>Anak ke-</td>
              <td>: {data?.birtd_order ?? ""}</td>
            </tr>
            <tr>
              <td>Jumlah Saudara</td>
              <td>: {data?.number_of_siblings ?? ""}</td>
            </tr>
            <tr>
              <td>Alamat</td>
              <td>: {data?.residence_addr ?? ""}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>: {data?.email ?? ""}</td>
            </tr>
            <tr>
              <td>Telepon</td>
              <td>: {data?.phone ?? ""}</td>
            </tr>
            <tr>
              <td>Pendidikan</td>
              <td>: {data?.education_level ?? ""}</td>
            </tr>
            <tr>
              <td>Kelas</td>
              <td>: {data?.class ?? ""}</td>
            </tr>
            <tr>
              <td>Asal PG</td>
              <td>: {data?.origin_pg ?? ""}</td>
            </tr>
            <tr>
              <td>Asal TK</td>
              <td>: {data?.origin_kgarten ?? ""}</td>
            </tr>
            <tr>
              <td>Asal SD</td>
              <td>: {data?.origin_elementary ?? ""}</td>
            </tr>
            <tr>
              <td>Asal SMP</td>
              <td>: {data?.origin_secondary ?? ""}</td>
            </tr>
            <tr>
              <td>Pindahan</td>
              <td>: {data?.is_transfer ? "Ya" : "Tidak"}</td>
            </tr>
            <tr>
              <td>Kelas Terakhir</td>
              <td>: {data?.last_class ?? ""}</td>
            </tr>
            <tr>
              <td>Alamat Sekolah</td>
              <td>: {data?.address_school ?? ""}</td>
            </tr>
            <tr>
              <td>Catatan</td>
              <td>: {data?.remark ?? ""}</td>
            </tr>
            <tr>
              <td>Status Kelas</td>
              <td>
                :{" "}
                {Options.statusClass.find((o) => o.value == data?.status_class)
                  ?.label ?? "Persiapan"}
              </td>
            </tr>
            <tr>
              <td>Disetujui</td>
              <td>: {data?.approved ? "Ya" : "Belum"}</td>
            </tr>
            <tr>
              <td>Lulus</td>
              <td>: {data?.is_graduated ? "Ya" : "Tidak"}</td>
            </tr>
          </tbody>
        </table>
      </Dialog>

      <div className="flex flex-wrap gap-2 mx-4 mb-6">
        <Search onEnter={(v) => setFilter({ ...filter, search_query: v })} />

        <div>
          <Select
            placeholder="Semua"
            keyValue="value"
            keyDisplay="label"
            value={filter.approved}
            options={approvedOptions}
            onChange={(e) => setFilter({ ...filter, approved: e.target.value })}
          />
        </div>

        <div>
          <Select
            placeholder="Semua"
            keyValue="value"
            keyDisplay="label"
            value={filter.is_graduated}
            options={graduatedOptions}
            onChange={(e) =>
              setFilter({ ...filter, is_graduated: e.target.value })
            }
          />
        </div>
      </div>

      <div className="overflow-x-auto  mb-6 mx-4 bg-base-100 p-3 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th className="min-w-60">Siswa</th>
              <th className="min-w-60">Email & Telp</th>
              <th className="min-w-60">Kelas</th>
              <th>Pindahan</th>
              <th>Disetujui</th>
              <th>Lulus</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((dat, i) => (
              <tr key={i}>
                <td>
                  <p className="text-base">{dat.full_name ?? ""}</p>
                  <span className="text-base-content/70">
                    {dat.gender ?? ""} - {getAge(dat.dob)}
                  </span>
                </td>
                <td>
                  <p className="text-base">{dat.email ?? ""}</p>
                  <span className="text-base-content/70">
                    {dat.phone ?? ""}
                  </span>
                </td>
                <td>
                  <p className="text-base">
                    {dat.education_level ?? ""} - {dat.class ?? ""}
                  </p>
                  <span className="text-base-content/70">
                    {Options.statusClass.find(
                      (o) => o.value == dat.status_class
                    )?.label ?? "Persiapan"}
                  </span>
                </td>
                <td>
                  {dat.is_transfer ? (
                    <FaCheckCircle className="text-success" size={20} />
                  ) : (
                    <FaCircleXmark className="text-error" size={20} />
                  )}
                </td>
                <td>
                  {dat.approved ? (
                    <FaCheckCircle className="text-success" size={20} />
                  ) : (
                    <FaCircleXmark className="text-error" size={20} />
                  )}
                </td>
                <td>
                  {dat.is_graduated ? (
                    <FaCheckCircle className="text-success" size={20} />
                  ) : (
                    <FaCircleXmark className="text-error" size={20} />
                  )}
                </td>
                <td>
                  <div className="join">
                    <div
                      onClick={() => {
                        setData(dat);
                        openDialog(dialogListAttachments);
                      }}
                      className="btn btn-square btn-sm join-item tooltip flex"
                      data-tip="Lampiran"
                    >
                      <FaFile />
                    </div>
                    <div
                      onClick={() => {
                        setData(dat);
                        openDialog(dialogDetailCandidate);
                      }}
                      className="btn  btn-square btn-sm join-item tooltip flex"
                      data-tip="Detail"
                    >
                      <FaEye />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-4 mb-6">
        <PaginationBar
          meta={paginate}
          onNextClick={() => setFilter({ ...filter, page: filter.page + 1 })}
          onPrevClick={() => setFilter({ ...filter, page: filter.page - 1 })}
          onLimitChange={(limit) => setFilter({ ...filter, limit, page: 0 })}
        />
      </div>
    </>
  );
};

export default Kandidat;
