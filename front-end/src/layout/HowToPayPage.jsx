import image1 from "../image/Pimage1.png";
import image2 from "../image/Pimage2.png";
import image3 from "../image/Pimage3.png";

export default function HowToPayPage() {
    return (
        <div className="how-to-page">
            <div className="my-[20px] ml-[10px]">
                <h1>วิธีสั่งซื้อและชำระเงิน</h1>
            </div>
            <hr />
            <div className="bg-gray-700 flex justify-around mt-[10px] py-[10px]">
                <div className="text-center max-w-[350px] border-x ">
                    <div>1</div>
                    <img src={image1} className="mx-auto max-w-[200px]"/>
                    <div>สั่งซื้อสินค้า</div>
                    <div className="text-sm">ก่อนกดสั่งซื้อ ให้ระบุ  หรือ ตรวจสอบ email , line , facebook เพื่อสะดวกในการติดต่อกับร้านค้า และลูกค้า </div>
                </div>
                <div className="text-center max-w-[350px] border-x">
                    <div>2</div>
                    <img src={image2} className="mx-auto max-w-[200px]"/>
                    <div>ชำระเงิน</div>
                    <div className="text-sm">ใบสั่งซื้อและข้อมูลการชำระเงิน จะถูกส่งไปที่ email , facebook , line ที่กรอกไว้</div>
                </div>
                <div className="text-center max-w-[350px] border-x">
                    <div>3</div>
                    <img src={image3} className="mx-auto max-w-[200px]"/>
                    <div>แจ้งชำระเงิน</div>
                    <div className="text-sm">ส่งหลักฐานการชำระเงินพร้อมเขียนเลขที่ใบสั่งซื้อลงในสลิป แจ้งทาง line , email ทีมงานจะทำการตรวจสอบข้อมูล และจัดส่งโค้ดเกมให้ไม่เกิน 12 ช.ม.</div>
                </div>
            </div>

            <div className="mt-[30px]">
                <div className="mx-[20px] my-[10px]">ข้นตอนการสั่งซื้อ</div>
                <div className="mx-[30px] my-[10px]">
                    <ul>
                        <li>1. สั่งซื้อเกมผ่านเว็บไซต์เรียบร้อยแล้วจะได้รับ เลขที่ใบสั่งซื้อ จากนั้นให้ทำตามขั้นตอนดังนี้</li>
                        <li>2. ชำระเงินด้วยวิธีโอนเงินเข้าบัญชีธนาคาร หรือ บัญชี True Money Wallet**โปรดชำระเงินให้พอดีราคาสินค้า ทางร้านจะไม่เก็บหรือคืนเงินส่วนต่างให้หากเติมเกินราคาสินค้า**</li>
                        <li>3. ไปที่เมนูแจ้งชำระเงิน ทักแชท Line@ และใช้เลขที่ใบสั่งซื้อที่ได้จากขั้นตอนหรือจากอีเมล์ที่ร้านส่งไปให้  แนบไฟล์สลิปพร้อมเขียนเลขใบสั่งซื้อลงในสลิปเพื่อเป็นหลักฐานในการตรวจสอบ</li>
                        <li>4. เมื่อทางร้านได้รับแจ้งชำระเงินแล้วจะทำการตรวจสอบข้อมูล เมื่อเรียบร้อยแล้วจะจัดส่งโค้ดเกมให้ไม่เกิน 12 ช.ม.</li>
                    </ul>
                </div>
                <div className="mx-[20px] my-[10px] text-red-500">**โปรดชำระเงินภายในวันที่สั่งซื้อสินค้า หากเกินกำหนด รายการสินค้าที่สั่งจะถูกยกเลิก**</div>
            </div>
        </div>
    );
}