import aaa from "../image/Capture1.png"
import bbb from "../image/Capture2.png"
import ccc from "../image/Capture3.png"
import ddd from "../image/Capture4.png"
import eee from "../image/Capture5.png"
import fff from "../image/Capture6.png"


export default function AdsBar() {
    
    return (
        <div>
            <div className="carousel w-full">
                <div id="item1" className="carousel-item w-full">
                    <img src={aaa} />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img src={bbb} />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img src={ccc} className="w-full" />
                </div>
                <div id="item4" className="carousel-item w-full">
                    <img src={ddd} className="w-full" />
                </div>
                <div id="item5" className="carousel-item w-full">
                    <img src={eee} className="w-full" />
                </div>
                <div id="item6" className="carousel-item w-full">
                    <img src={fff} className="w-full" />
                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
                <a href="#item4" className="btn btn-xs">4</a>
                <a href="#item5" className="btn btn-xs">5</a>
                <a href="#item6" className="btn btn-xs">6</a>
            </div>
        </div>
    )
}