import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  links?: { l: string; t?: string }[];
  title?: string;
  right?: ReactNode;
}

const Header = ({ links, right, title }: Props) => {
  return (
    <div>
      <div className=" flex items-center m-4">
        <div className="grow">
          {links ? (
            <div className="breadcrumbs h-fit">
              <ul className="m-0">
                {links.map((l, i) => (
                  <li key={i} className="text-sm text-base-content/70">
                    {l.t ? <Link to={l.t}>{l.l}</Link> : l.l}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}

          {title && <h2 className="text-xl font-bold">{title}</h2>}
        </div>
        {right}
      </div>
    </div>
  );
};

export default Header;
