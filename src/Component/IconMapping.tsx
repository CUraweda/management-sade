import { BsFillHouseFill, BsTable } from "react-icons/bs";
import { FaMoneyBillWave, FaRegStar } from "react-icons/fa";
import {
  IoCard,
  IoPersonOutline,
  IoPersonSharp,
  IoTrashOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import {
  FaChartSimple,
  FaGear,
  FaListCheck,
  FaMoneyBillTransfer,
  FaPersonCircleCheck,
} from "react-icons/fa6";
import { VscServerProcess } from "react-icons/vsc";
import { MdOutlineMessage, MdOutlineTableChart } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { CiMoneyCheck1 } from "react-icons/ci";
import { GoTasklist } from "react-icons/go";
import { PiTicket } from "react-icons/pi";
import { LuBook } from "react-icons/lu";
// tambahkan import untuk ikon lainnya di sini

export const iconMapping: { [key: string]: JSX.Element } = {
  "<IoTrashOutline />": <IoTrashOutline />,
  "<BsFillHouseFill />": <BsFillHouseFill />,
  "<IoPeopleOutline />": <IoPeopleOutline />,
  "<FaMoneyBillWave />": <FaMoneyBillWave />,
  "<IoPersonSharp />": <IoPersonSharp />,
  "<PiTicket />": <PiTicket />,
  "<LuBook />": <LuBook />,
  "<FaMoneyBillTransfer />": <FaMoneyBillTransfer />,
  "<FaChartSimple />": <FaChartSimple />,
  "<IoCard />": <IoCard />,
  "<VscServerProcess />": <VscServerProcess />,
  "<FaGear />": <FaGear />,
  "<MdOutlineTableChart />": <MdOutlineTableChart />,
  "<BsTable />": <BsTable />,
  "<FaPersonCircleCheck />": <FaPersonCircleCheck />,
  "<GrGroup />": <GrGroup />,
  "<IoPersonOutline />": <IoPersonOutline />,
  "<FaRegStar />": <FaRegStar />,
  "<MdOutlineMessage />": <MdOutlineMessage />,
  "<CiMoneyCheck1 />": <CiMoneyCheck1 />,
  "<GoTasklist />": <GoTasklist />,
  "<FaListCheck />": <FaListCheck />,
  // tambahkan pemetaan untuk ikon lainnya di sini
};
