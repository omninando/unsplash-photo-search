import React from 'react'

class ImageList extends React.Component {
    constructor() {
        super();

        this.state = {
            modalInfo: {},
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(event) {
        const {
            isModalOpen
        } = this.state;

        const {
            images
        } = this.props;

        if (isModalOpen) {
            this.setState({
                isModalOpen: !isModalOpen
            });

            return;
        }

        images.forEach((item) => {
            console.log(item.urls.small === event.target.src)
            if (item.urls.small === event.target.src) {
                this.setState({
                    modalInfo: item,
                    isModalOpen: !isModalOpen
                });
                console.log(this.state.modalInfo)
            }
        })

    }

    render() {
        const {
            images
        } = this.props;

        const {
            modalInfo,
            isModalOpen
        } = this.state;

        let modalOpen = isModalOpen ? 'image-modal -active' : 'image-modal';

        return <section className="image-list__wrapper">
            <div className="image-list">
                {
                    images &&
                    images.map((item, index) => {
                        return <div onClick={this.toggleModal} className='image-list__image' key={index} >
                                <img src={item.urls.small} />
                            </div>
                    })
                }
                <div className={modalOpen}>
                    {
                        modalInfo.urls &&
                        <div
                            className="image-modal__information"
                            style={{backgroundImage: 'url('+ modalInfo.urls.regular + ')', backgroundSize: 'cover'}}>
                            <div className="image-modal__information__overlay"></div>
                            <a
                                onClick={this.toggleModal}
                                className="image-modal__information__close">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                                    <path fill="currentColor" d="M638.6 500l322.7-322.7c38.3-38.3 38.3-100.3 0-138.6S861 .4 822.7 38.7L500 361.4 177.3 38.7C139 .4 77 .4 38.7 38.7S.4 139 38.7 177.3L361.4 500 38.7 822.7C.4 861 .4 923 38.7 961.3 57.9 980.4 82.9 990 108 990s50.1-9.6 69.3-28.7L500 638.6l322.7 322.7c19.1 19.1 44.2 28.7 69.3 28.7 25.1 0 50.1-9.6 69.3-28.7 38.3-38.3 38.3-100.3 0-138.6L638.6 500z"/>
                                </svg>
                            </a>
                            <p className="image-modal__information__name">
                                {modalInfo.user.last_name ? modalInfo.user.first_name + ' ' + modalInfo.user.last_name : modalInfo.user.first_name}
                            </p>
                            <a className="image-modal__information__download"
                               href={modalInfo.links.download}
                               target="_blank">
                                Download
                            </a>
                        </div>
                    }
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    0% {
                        opacity: 0
                    }
                    100% {
                        opacity: 1
                    }
                }

                .image-list__wrapper {
                    padding: 0 5%;
                    width: 100%;
                    z-index: 30;
                }

                .image-modal {
                    position: fixed;
                    top: 0;
                    padding: 0;
                    margin: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: -1;
                    opacity: 0;
                    visibility: hidden;
                    transition: 0.3s ease-in;
                }

                .image-modal.-active {
                    z-index: 100;
                    opacity: 1;
                    background: black;
                    visibility: visible;
                }

                .image-modal__information {
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    justify-content: flex-end;
                    margin: 0;
                    padding: 0;
                    width: 100%;
                }

                .image-modal__information__close {
                    position: absolute;
                    right: 20px;
                    top: 20px;
                    width: 30px;
                    height: 30px;
                    color: white;
                }

                .image-modal__information__name {
                    color: white;
                    font-size: 42px;
                    line-height: 0;
                    z-index: 1;
                }

                .image-modal__information__overlay {
                    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%);
                    height: 100%;
                    position: absolute;
                    width: 100%;
                    z-index: 0;
                }

                .image-modal__information__download {
                    color: #bbb;
                    display: block;
                    font-size: 26px;
                    margin-bottom: 4%;
                    padding: 8px;
                    text-decoration: none;
                    text-transform: uppercase;
                    width: 250px;
                    z-index: 1;
                }

                @media (min-width: 768px) {
                    .image-modal__information__name {
                        font-size: 60px;
                    }

                    .image-modal__information__download {
                        font-size: 32px;
                    }
                }

                .image-list {
                    align-items: center;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .image-list__image {
                    align-items: center;
                    display: flex;
                    height: 300px;
                    justify-content: center;
                    margin: 1% 1% 3%;
                    overflow: hidden;
                    position: relative;
                    width: 90%;
                    transition: 0.3s
                }

                @media (min-width: 768px) {
                    .image-list__image {
                        margin: 1% 1%;
                        width: 45%;
                    }
                }

                @media (min-width: 1024px) {
                    .image-list__image {
                        width: 30%;
                    }
                }

                .image-list__image img {
                    margin-left: 0;
                    position: absolute;
                    width: 150%;
                    left: -25%;
                    top: -5%;
                }
            `}</style>
        </section>
    }
}

export default ImageList;
