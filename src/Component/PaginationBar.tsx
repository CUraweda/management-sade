export interface IpageMeta {
  page: number;
  limit: number;
  totalRows?: number;
  totalPage?: number;
}

interface Props {
  meta: IpageMeta;
  useLimit?: boolean;
  useTotal?: boolean;
  initialPage?: number;
  onPrevClick: () => void;
  onNextClick: () => void;
  onLimitChange?: (val: number) => void;
}

const pageAdjust: Record<string, number> = {
  "-1": 2,
  "0": 1,
  "1": 0,
  "2": -1,
};

const PaginationBar = ({
  meta,
  onPrevClick,
  onNextClick,
  useLimit = true,
  useTotal = true,
  initialPage = 0,
  onLimitChange = () => {},
}: Props) => {
  return (
    <div className="w-full items-center flex-wrap justify-end flex mt-3 gap-3">
      {useTotal && (
        <p
          className={
            "me-auto text-sm " +
            (meta.totalRows ? "text-neutral-500" : "text-error")
          }
        >
          {meta.totalRows
            ? `Total terdapat ${meta.totalRows} data`
            : "Tidak terdapat data"}
        </p>
      )}
      {useLimit && (
        <div className="join">
          <select
            value={meta.limit}
            onChange={(e) => onLimitChange(parseInt(e.target.value))}
            className="select bg-base-200 join-item w-full max-w-xs"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <button className="join-item btn">per halaman</button>
        </div>
      )}
      <div className="join">
        <button
          className="join-item btn"
          onClick={onPrevClick}
          disabled={meta.page == initialPage}
        >
          «
        </button>
        <button tabIndex={0} className="btn join-item ">
          Halaman {meta.page + pageAdjust[initialPage.toString()]}
        </button>
        <button
          className="join-item btn"
          onClick={onNextClick}
          disabled={
            meta.page + pageAdjust[initialPage.toString()] == meta.totalPage
          }
        >
          »
        </button>
      </div>
    </div>
  );
};

export default PaginationBar;
