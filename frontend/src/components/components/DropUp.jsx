import { useState, useRef, useEffect } from "react";
import Button from "../widgets/Button";
import PropTypes from "prop-types";

const DropUp = ({ children }) => {
  const [open, setOpen] = useState(false);
  const dropupRef = useRef(null);

  const toggleDropup = () => {
    setOpen((prev) => !prev);
  };

  // Cierra el menú si haces clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropupRef.current && !dropupRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropup" ref={dropupRef}>
      <Button className="chat-button" onClick={toggleDropup}>
        <ion-icon name="add"></ion-icon>
      </Button>

      {open && (
        <div className="dropup-menu">
            {children}
        </div>
      )}
    </div>
  );
};

DropUp.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DropUp;