import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dialog, Slide } from "@mui/material";
import Slider from "react-slick";
import NotificationManager from "react-notifications/lib/NotificationManager";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Action from "../../../Service/action";
import "./gameitem.css";

const settings = {
    // speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 7000,
    dots: true,
    responsive: [
        {
            breakpoint: 1900,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
            },
        },
    ],
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function Responsive() {
    const [isBalanceModalShow, setIsBalanceModalShow] = useState(false);
    const [gameItems, setGameItems] = useState([]);
    const [gbalance, setGbalance] = useState(0);
    const [poolAddress, setPoolAddress] = useState("");
    const [name, setName] = useState("");
    const [poolBalance, setPoolBalance] = useState(0);

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth);
    const games = useSelector((state) => state.gamelist);

    useEffect(() => {
        var gamelist = games.gamelist;
        setGameItems(gamelist);
    }, [games.gamelist]);

    const confirmBalance = async (name, poolAddress) => {
        if (user.isAuthenticated && localStorage.getItem("jwtToken")) {
            var allowanceAmount = 1000;
            var poolBalance = 1000;
            try {
                var allowance = user.user.allowances.find(
                    (allowance) => allowance.gamePoolAddress === poolAddress
                );
                allowanceAmount = allowance.amount;
            } catch (err) {
                console.log("no allowance data");
            }

            try {
                poolBalance = games.gamelist.find(
                    (game) => game.poolAddress === poolAddress
                ).poolBalance;
            } catch (err) {
                console.log(err);
            }

            setIsBalanceModalShow(true);
            setName(name);
            setPoolAddress(poolAddress);
            setGbalance(allowanceAmount);
            setPoolBalance(poolBalance);
        } else {
            NotificationManager.warning("Please Sign Up", "", 3000);
        }
    };

    const showIframePad = async (poolAddress) => {
        if (gbalance <= user.user.balance && gbalance > 0) {
            if (user.isAuthenticated && localStorage.jwtToken) {
                let success = await Action.approveToGame(gbalance, poolAddress);

                if (!success) return;
                setIsBalanceModalShow(false);
                navigate(`IframeBlock/${poolAddress}`);

                var allowanceAmount = 1000;
                try {
                    var allowance = user.user.allowances.find(
                        (allowance) => allowance.gamePoolAddress === poolAddress
                    );
                    allowanceAmount = allowance.amount;
                } catch (err) {
                    console.log("no allowance data");
                }

                window.onmessage = (e) => {
                    if (e.data.name === "iframe_message") {
                        const msg_data = {
                            poolAddress: poolAddress,
                            name: "iframe_message",
                            token: localStorage.getItem("jwtToken"),
                            allowanceAmount: gbalance,
                        };
                        document
                            .querySelector("#gameIframe")
                            .contentWindow.postMessage(msg_data, "*");
                    }
                };
            } else {
                NotificationManager.warning("Please Sign Up", "", 3000);
            }
        } else {
            NotificationManager.error("Insufficient Balance!", "", 3000);
        }
    };

    const handlebalancemodalclose = () => {
        setIsBalanceModalShow(false);
        setPoolAddress("");
    };

    return (
        <>
            <div className="nft">
                {gameItems.filter((glist) => {
                    return glist.approve_flag === true;
                }).length === 0 ? (
                    <div className="text-center" style={{ color: "white" }}>
                        No Game Item
                    </div>
                ) : (
                    <Slider {...settings}>
                        {gameItems
                            .filter((glist) => {
                                return glist.approve_flag === true;
                            })
                            .map((list, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() =>
                                            confirmBalance(
                                                list.name,
                                                list.poolAddress
                                            )
                                        }
                                    >
                                        <div className="nft_coll">
                                            <div className="nft_wrap">
                                                <span>
                                                    <img
                                                        src={list.game_img_src}
                                                        className="lazy img-fluid"
                                                        alt=""
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    />
                                                </span>
                                            </div>
                                            <div className="nft_coll_info">
                                                <div className="spacer-10" />
                                                <span>
                                                    <h4>
                                                        {list.name.length > 15
                                                            ? list.name.slice(
                                                                0,
                                                                15
                                                            ) + "..."
                                                            : list.name}
                                                    </h4>
                                                </span>
                                                <span>
                                                    {list.description.length >
                                                        20
                                                        ? list.description.slice(
                                                            0,
                                                            20
                                                        ) + "..."
                                                        : list.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </Slider>
                )}
            </div>
            <Dialog
                className="BalanceDialog"
                open={isBalanceModalShow}
                TransitionComponent={Transition}
                keepMounted
                maxWidth="xl"
            >
                <div className="balance-modal-main">
                    <div className="balance-modal-title">{name}</div>
                    <div className="balance-input-block">
                        <span>Game PoolAddress:</span>
                        <span>
                            {!poolAddress
                                ? ""
                                : poolAddress.slice(0, 5) +
                                "..." +
                                poolAddress.slice(-5)}
                        </span>
                    </div>
                    <div className="balance-input-block">
                        Amount:
                        <input
                            required
                            className="balance-input"
                            type="number"
                            value={gbalance}
                            onChange={(e) => {
                                setGbalance(e.target.value);
                            }}
                            placeholder="Please input amount"
                        />
                    </div>
                    <div className="balance-input-block">
                        <span>Allowance Amount:</span>
                        <span style={{ color: "var(--block_clr)" }}>
                            {gbalance} ICICB
                        </span>
                    </div>
                    <div className="balance-input-block">
                        <span>My Balance:</span>
                        <span style={{ color: "var(--block_clr)" }}>
                            {Number(user.user.balance).toFixed(0)} ICICB
                        </span>
                    </div>
                    <div className="balance-input-block">
                        <span>Game Amount:</span>
                        <span style={{ color: "var(--block_clr)" }}>
                            {Number(poolBalance).toFixed(0)} ICICB
                        </span>
                    </div>
                    <div className="balance-button-block">
                        <div
                            className="balance-btn agree-btn"
                            onClick={() => showIframePad(poolAddress)}
                        >
                            Agree
                        </div>
                        <div
                            className="balance-btn no-btn"
                            onClick={() => handlebalancemodalclose()}
                        >
                            No
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
