import { Link } from "react-router-dom";
import "../components/styls/card.css";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const Card = ({
  card: {
    title,
    subtitle,
    description,
    phone,
    email,
    web,
    image,
    address,
    bizNumber,
    _id,
  },
  onLiked,
  liked,
  isCreator,
}) => {
  const location = useLocation();
  const { user } = useAuth();

  const handleClick = () => {
    if (location.pathname === "/") {
      const popupMessage = `
      <div style="text-align: left;">
        <h4><strong>Title:</strong> ${title}</h4>
        <h5><strong>Subtitle:</strong> ${subtitle}</h5>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Street:</strong> ${address.street}</p>
        <p><strong>House Number:</strong> ${address.houseNumber}</p>
        <p><strong>City:</strong> ${address.city}</p>
        <p><strong>State:</strong> ${address.state}</p>
        <p><strong>Country:</strong> ${address.country}</p>
        <p><strong>Zip:</strong> ${address.zip}</p>
        <p><strong>Description:</strong> ${description}</p>
      </div>
    `;

      Swal.fire({
        title: `
        <div style="border: 2px solid #0a4275; padding: 10px; background-color: #0a4275; color: white;">
          <span style="font-size: 44px;">😊</span> <!-- Emoji icon -->
          <span style='color: GoldenRod; font-size: 24px;'>Nice to meet you</span> <!-- Text with GoldenRod color -->
        </div>
      `,
        html: popupMessage,
        showCancelButton: false,
        confirmButtonText: "Close",
        confirmButtonColor: "#0a4275",
      });
    }
  };

  const toggleLike = () => {
    onLiked();
  };

  return (
    <div className="card me-4 mb-4 p-2" style={{ width: "18rem" }}>
      <img
        {...(location.pathname === "/"
          ? { onClick: handleClick, style: { cursor: "pointer" } }
          : {})}
        src={image?.url || "DefaultImg.svg.png"}
        className="card-img-top"
        alt={image?.alt || "Card image"}
      />
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <h5 className="card-subtitle">{subtitle}</h5>
        <p className="card-text">{description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>phone:</strong> {phone}
        </li>
        <li className="list-group-item">
          <strong>web:</strong> {web}
        </li>
        <li className="list-group-item">
          <strong>email:</strong> {email}
        </li>
        <li className="list-group-item">
          <strong>street:</strong>{" "}
          {`${address?.street} ${address?.houseNumber}`}
          <br />
          <strong>city:</strong> {address?.city}
          <br />
          <strong>state:</strong> {address?.state}
          <br />
          <strong>country:</strong> {address?.country}
          <br />
          <strong>zip:</strong> {address?.zip}
        </li>

        <li className="list-group-item">
          <strong>bizNumber:</strong> {bizNumber}
        </li>
      </ul>
      <div className="card-body d-flex justify-content-between">
        <div>
          {user &&
            (location.pathname.includes("/my-cards") ||
              location.pathname.includes("/my-cards/edit")) && (
              <>
                <Link to={`/my-cards/delete/${_id}`} className="card-link">
                  <i className="bi bi-trash"></i>
                </Link>
                <Link to={`/my-cards/edit/${_id}`} className="card-link">
                  <i className="bi bi-pencil-square"></i>
                </Link>
              </>
            )}
        </div>

        <div>
          {user && (
            <button onClick={() => toggleLike()} className="card-link ms-auto">
              <i
                className={`bi ${
                  liked ? "bi-heart-fill heart-icon" : "bi-heart heart-icon"
                }`}
              ></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
