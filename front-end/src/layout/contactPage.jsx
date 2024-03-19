import lineImg from "../image/line.jpg";
import facebookImg from "../image/fb_icon.png";
import emailImg from "../image/mail_icon.png";


export default function ContactPage() {
    return (
        <div className="my-[50px] px-[20px] py-[30px] flex justify-around bg-gray-800 ">
            <div className="w-[500px] mx-[20px]">
                <div className="my-4">
                    Man Shop
                </div>
                <hr />
                <div className="my-4">
                    <p className="mb-3">เวลาทำการงาน : จันทร์ - อาทิตย์ 9.00 - 18.00</p>
                    <p className="mb-3">ติดต่อสอบถามปัญหาหรือเรื่องอื่นๆได้ที่</p>
                    <p className="mb-3">
                        <a href="https://www.facebook.com/profile.php?id=100017674362301" className="flex">
                            <img src={facebookImg}/>
                            "Supavit Khamvichian"
                        </a>
                    </p>
                    <p className="mb-3"><a href="https://www.facebook.com/profile.php?id=100017674362301" className="flex">
                            <img src={emailImg}/>
                            "kuman7441@gmail.com"
                        </a></p>
                </div>
            </div>

            <div className="border-x-[1px]"></div>

            <div className="w-[500px] mx-[20px]">
                <div className="my-4">
                    ติดต่อสอบถามข้อมูล
                </div>
                <hr />
                <div className="my-4">
                    <img src={lineImg} className="mx-auto max-w-[200px]" />
                </div>
            </div>
        </div>
    )
}