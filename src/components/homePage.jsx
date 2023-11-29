import React, { useState, useEffect, useCallback } from "react";
import cardsService, { getAll } from "../services/cardsService";
import PageHeader from "../common/pageHeader";
import Card from "./card";
import { Link, useNavigate } from "react-router-dom";
import "./styls/homePage.css";
import { getUser } from "../services/usersService";
import { useSearch } from "../context/searchContext";
import Swal from "sweetalert2";
import { useAuth } from "../context/auth.context";

const HomePage = () => {
  const [cards, setCards] = useState([]);
  const [visible, setVisible] = useState(8);
  const { searchTerm } = useSearch();

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getAll().then((fetchedCards) => {
      setCards(fetchedCards.data);
    });
  }, []);

  const showMoreCards = () => {
    setVisible((prevVisible) => prevVisible + 4);
  };

  const onLiked = async (card) => {
    try {
      await cardsService.likeCard(card._id);
      const response = await getAll();
      setCards(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const fetchAndFilterCards = async () => {
      const { data } = await getAll();
      const filteredCards = data.filter((card) =>
        card.title.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setCards(filteredCards);
    };

    if (searchTerm) {
      fetchAndFilterCards();
    } else {
      getAll().then((fetchedCards) => {
        setCards(fetchedCards.data);
      });
    }
  }, [searchTerm]);

  const CardList = useCallback(() => {
    const visibleCards = cards.slice(0, visible);
    if (visibleCards.length === 0) {
      return (
        <div className="fs-3 text-danger fw-bold">
          No cards matching your search...
        </div>
      );
    }

    return (
      <>
        {visibleCards.map((card) => {
          const user = getUser();
          const isLiked = user ? card.likes.includes(user._id) : false;
          return card.title ? (
            <Card
              key={card._id}
              card={card}
              onLiked={() => onLiked(card)}
              liked={isLiked}
            />
          ) : null;
        })}
      </>
    );
  }, [cards, visible]);

  const handleSignUpClick = (e) => {
    e.preventDefault();

    if (user) {
      Swal.fire({
        title: "You are already registered! 😊",
        icon: "info",
        timer: 1100,
        timerProgressBar: true,
      });
    } else {
      navigate("/sign-up");
    }
  };

  return (
    <>
      <PageHeader
        title={
          <>
            Welcome to
            <span
              className="ms-2 wave-once"
              style={{
                background: `-webkit-linear-gradient(45deg, #e5b55c, #0a4275)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ClickEvent
            </span>
          </>
        }
        description={
          <div>
            Welcome to our Event Management Platform! Discover a world of
            unforgettable experiences and seamless event planning. Whether
            you're organizing a conference, concert, wedding, or any special
            occasion, we've got you covered. Our platform empowers you to
            create, manage, and share events effortlessly.
            <br />
            <br />
            <strong>🌟 What We Offer:</strong>
            <ul>
              <li>
                Easy Event Creation: Craft stunning event pages in minutes.
              </li>
              <li>
                Ticket Management: Sell tickets, track sales, and manage
                attendees.
              </li>
              <li>
                Dynamic Promotion: Reach a broader audience with our marketing
                tools.
              </li>
              <li>
                Seamless Registration: Attendees can sign up quickly and
                securely.
              </li>
              <li>
                Event Analytics: Gain insights into your event's performance.
              </li>
              <li>
                Collaborative Planning: Work together with your team in
                real-time.
              </li>
              <li>
                Attendee Engagement: Keep your guests informed and engaged.
              </li>
            </ul>
            Join our community of event enthusiasts and make your next gathering
            a success. Get started today!
            <Link
              to="/sign-up"
              onClick={handleSignUpClick}
              className="ms-2 text-decoration-none fw-bold"
            >
              Sign-Up
            </Link>
          </div>
        }
      />
      <div>
        <h1
          className="text-center mb-5 p-3 border"
          style={{ backgroundColor: "#0a4275", color: "#e5b55c" }}
        >
          Some of our customers' cards
        </h1>
      </div>
      <div>
        <div className="row">
          <CardList />
        </div>
        <div className="d-flex justify-content-center my-3">
          <button
            className="btn btn-info mb-4 fw-bold LoadMoreBtn"
            onClick={showMoreCards}
            style={{
              backgroundColor: "#0a4275",
              color: "#e5b55c",
              border: "none",
            }}
          >
            Load More Cards
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
