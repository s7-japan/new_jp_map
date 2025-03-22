import FirstAidStation from "./assets/map-icons/mapicon_aidstation.png";
import ATMIcon from "./assets/map-icons/mapicon_atm.png";
import MapIconAttraction from "./assets/map-icons/mapicon_attraction.png";
import BicyclePark from "./assets/map-icons/mapicon_bicycleparking.png";
import CoinLockers from "./assets/map-icons/mapicon_coinlocker.png";
import MapEvent from "./assets/map-icons/mapicon_event.png";
import MapGate from "./assets/map-icons/mapicon_gate.png";
import ToiletIcon from "./assets/map-icons/mapicon_multipurposetoilet.png";
import NursingHome from "./assets/map-icons/mapicon_nursingroom.png";
// import GoodsShop from "./assets/map-icons/mapicon_officialgoodsshop.png";
import RestRoom from "./assets/map-icons/mapicon_restroom.png";
import SeatGuide from "./assets/map-icons/mapicon_smokingarea.png";
import TaxiArea from "./assets/map-icons/mapicon_taxi.png";
import TicketCounter from "./assets/map-icons/mapicon_ticket.png";
import WaterStation from "./assets/map-icons/mapicon_waterstation.png";
import WestCourseShuttle from "./assets/map-icons/mapicon_westcourceshuttlestop.png";
import MapIcon from "./assets/map-icons/mapicon_.png";
import MapIconCar from "./assets/map-icons/mapicon_car.png";
import MapIconSmoking from "./assets/map-icons/mapicon_smokingarea.png";
const ICONS = {
  アトラクション: MapIcon,
  チケット: TicketCounter,
  ゲート: MapGate,
  タクシー: TaxiArea,
  車: MapIconCar,
  バス: WestCourseShuttle,
  イベント: MapEvent,
  インフォメーション: MapIconAttraction,
  座席エリア: SeatGuide,
  救護所: FirstAidStation,
  喫煙所: MapIconSmoking,
  レストラン: MapIconAttraction,
  自動現金引出機: ATMIcon,
  駐輪場: BicyclePark,
  授乳室: NursingHome,
  多機能トイレ: RestRoom,
  コインロッカー: CoinLockers,
  給水所: WaterStation,
  化粧室: ToiletIcon,
};

export const BackgroundColorForEvent = {
  race_support: "#FF817F",
  race_f1: "#E00400",
  event: "#C5B9D0",
  event_f1: "#F56C9E",
  event_other: "#F6B1CA",
};
export default ICONS;
