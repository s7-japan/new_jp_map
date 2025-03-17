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
  メインゲート: "#B3B3B3",
  サポートレース: "#FF817F",
  F1レース: "#E00400",
  イベント: "#C5B9D0",
  F1イベント: "#F56C9E",
  その他イベント: "#F6B1CA",
  青: "#1716BB",
  ピンク: "#F56C9E",
  赤: "#E00400",
  黒: "#15151E",
  白: "#05df72",
};
export default ICONS;
