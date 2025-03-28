import Header from "~/components/Header/Header";

export default function PrivacyPage() {
  return (
    <div>
      <Header title="Chính sách bảo mật"></Header>
      <div className="mt-14">
        <div className="container">
          <h1 className="font-bold text-xl mb-2">Chính sách Bảo mật</h1>
          <p>
            Chính sách bảo mật này áp dụng cho ứng dụng Nhà của Yến Sào (gọi tắt
            là "Ứng dụng") trên các thiết bị di động được phát triển bởi Công ty
            TNHH Quản lý Nuôi trồng Nhà của Yến Sào Việt Nam (gọi tắt là "Nhà
            cung cấp Dịch vụ"), một dịch vụ miễn phí. Dịch vụ này được cung cấp
            "NHƯ ĐANG CÓ".
          </p>

          <h2 className="section-title font-bold mt-2">
            1. Thu thập và Sử dụng Thông tin
          </h2>
          <p>
            Ứng dụng thu thập thông tin khi bạn tải về và sử dụng. Thông tin có
            thể bao gồm các dữ liệu như:
          </p>
          <ul>
            <li>
              <strong>Thông tin cá nhân</strong>: Tên, địa chỉ email, số điện
              thoại, và các thông tin liên quan khác khi bạn đăng ký tài khoản
              hoặc thực hiện KYC.
            </li>
            <li>
              <strong>Thông tin KYC</strong>: Các thông tin để xác minh danh
              tính của bạn như CMND/CCCD, ảnh chụp bản sao giấy tờ tùy thân, ảnh
              chân dung, và các dữ liệu cần thiết để hoàn tất quy trình xác thực
              KYC.
            </li>
            <li>
              <strong>Thông tin giao dịch</strong>: Chi tiết các khoản đầu tư,
              lợi nhuận nhận được, và các giao dịch khác liên quan đến hoạt động
              của bạn trên ứng dụng.
            </li>
            <li>
              <strong>Thông tin kỹ thuật</strong>: Địa chỉ IP, loại thiết bị,
              phiên bản ứng dụng, thông tin về kết nối mạng, và các thông tin
              khác liên quan đến việc sử dụng dịch vụ.
            </li>
          </ul>
          <p>
            Ứng dụng không thu thập thông tin chính xác về vị trí của thiết bị
            di động của bạn.
          </p>
          <p>
            Nhà cung cấp Dịch vụ có thể sử dụng thông tin bạn cung cấp để liên
            lạc với bạn về các thông tin quan trọng, thông báo yêu cầu và các
            chương trình khuyến mãi.
          </p>

          <h2 className="section-title font-bold mt-2">
            2. Mục đích Sử dụng Thông tin
          </h2>
          <p>
            Nhà cung cấp Dịch vụ có thể yêu cầu bạn cung cấp thông tin cá nhân
            để cung cấp dịch vụ tốt hơn. Thông tin bạn cung cấp sẽ được lưu trữ
            và sử dụng theo các mục đích sau:
          </p>
          <ul>
            <li>
              <strong>Đăng ký tài khoản và xác thực KYC</strong>: Để đảm bảo
              rằng người dùng là hợp pháp và tuân thủ các quy định của pháp
              luật.
            </li>
            <li>
              <strong>Cung cấp dịch vụ và quản lý tài khoản của bạn</strong>.
            </li>
            <li>
              <strong>Xử lý các giao dịch và phân phối lợi nhuận</strong>.
            </li>
            <li>
              <strong>
                Cung cấp thông tin và hỗ trợ liên quan đến các sản phẩm/dự án
                của Nhà cung cấp Dịch vụ
              </strong>
              .
            </li>
            <li>
              <strong>
                Nâng cao chất lượng dịch vụ và phát triển ứng dụng
              </strong>
              .
            </li>
            <li>
              <strong>
                Tuân thủ các nghĩa vụ pháp lý và yêu cầu từ cơ quan có thẩm
                quyền
              </strong>
              .
            </li>
          </ul>

          <h2 className="section-title font-bold mt-2">
            3. Quy trình Đăng ký và Xác thực KYC
          </h2>
          <p>
            Khi bạn đăng ký tài khoản và thực hiện quy trình KYC, chúng tôi yêu
            cầu bạn cung cấp các thông tin cá nhân và tài liệu để xác minh danh
            tính. Các bước KYC có thể bao gồm nhưng không giới hạn ở:
          </p>
          <ul>
            <li>
              Cung cấp ảnh chụp giấy tờ tùy thân (CMND/CCCD, hộ chiếu, v.v.).
            </li>
            <li>
              Cung cấp ảnh chân dung bạn cùng với giấy tờ tùy thân của mình để
              xác thực hình ảnh.
            </li>
            <li>
              Các thông tin khác yêu cầu theo quy định của pháp luật hoặc yêu
              cầu từ các cơ quan quản lý.
            </li>
          </ul>
          <p>
            Chúng tôi cam kết sử dụng thông tin này chỉ với mục đích xác thực và
            đảm bảo an toàn cho các giao dịch của bạn trên ứng dụng.
          </p>

          <h2 className="section-title font-bold mt-2">
            4. Quyền Truy Cập và Chia Sẻ Thông tin
          </h2>
          <p>
            Nhà cung cấp Dịch vụ cam kết chỉ chia sẻ thông tin của bạn với bên
            thứ ba trong các trường hợp sau:
          </p>
          <ul>
            <li>
              Khi yêu cầu của pháp luật, chẳng hạn như để tuân thủ yêu cầu của
              tòa án hoặc các thủ tục pháp lý tương tự.
            </li>
            <li>
              Khi Nhà cung cấp Dịch vụ tin rằng việc tiết lộ là cần thiết để bảo
              vệ quyền lợi của họ, bảo vệ an toàn của bạn hoặc của người khác,
              điều tra gian lận hoặc đáp ứng yêu cầu từ cơ quan chính phủ.
            </li>
            <li>
              Nhà cung cấp Dịch vụ cũng có thể chia sẻ thông tin của bạn với các
              nhà cung cấp dịch vụ đáng tin cậy giúp họ vận hành dịch vụ, những
              nhà cung cấp này không sử dụng thông tin của bạn cho mục đích
              riêng của họ và đã đồng ý tuân thủ các điều khoản trong chính sách
              bảo mật này.
            </li>
          </ul>
          <p>
            Thông tin của bạn có thể được chia sẻ với các dịch vụ bên thứ ba như
            Google Play Services, các dịch vụ mà có Chính sách bảo mật riêng về
            việc xử lý dữ liệu.
          </p>

          <h2 className="section-title font-bold mt-2">5. Bảo Mật Thông tin</h2>
          <p>
            Thông tin mà bạn cung cấp cho quy trình KYC sẽ được bảo vệ theo các
            biện pháp bảo mật cao nhất để ngăn chặn việc truy cập trái phép. Các
            dữ liệu này sẽ được mã hóa và lưu trữ trong các cơ sở hạ tầng bảo
            mật an toàn, và chúng tôi sẽ sử dụng chúng chỉ cho mục đích xác thực
            và tuân thủ quy định.
          </p>

          <h2 className="section-title font-bold mt-2">6. Quyền Lựa Chọn</h2>
          <p>
            Bạn có quyền từ chối cung cấp thông tin hoặc ngừng thu thập thông
            tin bất cứ lúc nào bằng cách gỡ cài đặt ứng dụng. Tuy nhiên, nếu bạn
            không hoàn thành quy trình KYC, bạn có thể không thể sử dụng đầy đủ
            các tính năng của ứng dụng hoặc tham gia các giao dịch yêu cầu xác
            thực danh tính.
          </p>

          <h2 className="section-title font-bold mt-2">
            7. Chính sách Lưu Trữ Dữ Liệu
          </h2>
          <p>
            Nhà cung cấp Dịch vụ sẽ giữ lại dữ liệu do người dùng cung cấp trong
            suốt thời gian bạn sử dụng ứng dụng và một khoảng thời gian hợp lý
            sau đó. Nếu bạn muốn xóa thông tin mà bạn đã cung cấp qua ứng dụng,
            vui lòng liên hệ với chúng tôi qua email: contact@nhacuayensao.com,
            và chúng tôi sẽ xử lý yêu cầu của bạn trong thời gian hợp lý.
          </p>

          <h2 className="section-title font-bold mt-2">
            8. Thay Đổi Chính Sách Bảo Mật
          </h2>
          <p>
            Chính sách bảo mật này có thể được cập nhật định kỳ để phản ánh
            những thay đổi trong thực tiễn của chúng tôi hoặc yêu cầu pháp lý.
            Mọi thay đổi sẽ được thông báo trên trang này. Bạn được khuyến khích
            kiểm tra thường xuyên để cập nhật các thay đổi.
          </p>

          <h2 className="section-title font-bold mt-2">9. Liên Hệ</h2>
          <p>
            Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật hoặc các thực
            tiễn của chúng tôi trong khi sử dụng ứng dụng, vui lòng liên hệ với
            chúng tôi qua email: contact@nhacuayensao.com.
          </p>

          <p>
            <strong>Ngày có hiệu lực</strong>: 2025-03-11
          </p>
        </div>
      </div>
    </div>
  );
}
