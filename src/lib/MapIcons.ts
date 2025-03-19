import FirstAidStation from "../assets/map-icons/mapicon_aidstation.png";
import ATMIcon from "../assets/map-icons/mapicon_atm.png";
import MapIconAttraction from "../assets/map-icons/mapicon_attraction.png";
import BicyclePark from "../assets/map-icons/mapicon_bicycleparking.png";
import CoinLockers from "../assets/map-icons/mapicon_coinlocker.png";
import MapEvent from "../assets/map-icons/mapicon_event.png";
import MapGate from "../assets/map-icons/mapicon_gate.png";
import ToiletIcon from "../assets/map-icons/mapicon_multipurposetoilet.png";
import NursingHome from "../assets/map-icons/mapicon_nursingroom.png";
import RestRoom from "../assets/map-icons/mapicon_restroom.png";
import SeatGuide from "../assets/map-icons/mapicon_smokingarea.png";
import TaxiArea from "../assets/map-icons/mapicon_taxi.png";
import TicketCounter from "../assets/map-icons/mapicon_ticket.png";
import WaterStation from "../assets/map-icons/mapicon_waterstation.png";
import WestCourseShuttle from "../assets/map-icons/mapicon_westcourceshuttlestop.png";
import MapIcon from "../assets/map-icons/mapicon_.png";
import MapIconCar from "../assets/map-icons/mapicon_car.png";
import MapIconSmoking from "../assets/map-icons/mapicon_smokingarea.png";

export const ICONS = {
  アトラクション: MapIconAttraction.src,
  チケット: TicketCounter.src,
  ゲート: MapGate.src,
  タクシー: TaxiArea.src,
  車: MapIconCar.src,
  バス: WestCourseShuttle.src,
  イベント: MapEvent.src,
  インフォメーション: MapIconAttraction.src,
  座席エリア: SeatGuide.src,
  救護所: FirstAidStation.src,
  喫煙所: MapIconSmoking.src,
  レストラン: MapIconAttraction.src,
  自動現金引出機: ATMIcon.src,
  駐輪場: BicyclePark.src,
  授乳室: NursingHome.src,
  多機能トイレ: RestRoom.src,
  コインロッカー: CoinLockers.src,
  給水所: WaterStation.src,
  化粧室: ToiletIcon.src,
  西コースシャトル停留所: WestCourseShuttle.src,
  駐車場: MapIconCar.src,
  オフィシャルグッズ販売: MapIconAttraction.src,
  default: MapIcon.src,
};
