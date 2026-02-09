export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10 text-gray-500">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <h2 className="font-serif text-2xl text-white mb-6">Sensus</h2>
          <p className="text-sm leading-relaxed max-w-md mb-6">
            "Tech meets Taste."<br/>
            우리는 기술을 통해 커피의 불확실성을 제거하고,<br/>
            가장 완벽한 한 잔의 경험을 설계합니다.
          </p>
          <div className="flex gap-4 text-white">
            {/* Social Icons Placeholder */}
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">Ins</div>
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">Ytb</div>
          </div>
        </div>
        
        <div>
          <h3 className="text-white text-xs uppercase tracking-widest mb-6">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li>B2B Solutions: b2b@sensus.com</li>
            <li>Recruit: hr@sensus.com</li>
            <li>Customer: help@sensus.com</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-xs uppercase tracking-widest mb-6">Information</h3>
          <ul className="space-y-4 text-xs">
            <li>상호명: Sensus</li>
            <li>대표: 김개발</li>
            <li>사업자등록번호: 123-45-67890</li>
            <li>주소: 서울특별시 영등포구 여의대로 108, 파크원 22F</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs">
        <p>&copy; 2026 Seunsus All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}