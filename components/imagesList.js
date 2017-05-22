import React from 'react'

class ImageList extends React.Component {
    constructor() {
        super();

        this.state = {
            modalInfo: {},
            isModalOpen: false
        };

        this.openModal = this.openModal.bind(this);
    }

    openModal(event) {
        const {
            isModalOpen
        } = this.state;

        const {
            images
        } = this.props;

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
                        return <div onClick={this.openModal} className='image-list__image' key={index} >
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
                            <p className="image-modal__information__name">
                                {modalInfo.user.last_name ? modalInfo.user.first_name + ' ' + modalInfo.user.last_name : modalInfo.user.first_name}
                            </p>
                            <a  className="image-modal__information__download"
                                href={modalInfo.links.download}>
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
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    justify-content: flex-end;
                    margin: 0;
                    padding: 0;
                    width: 100%;
                }

                .image-modal__information__name {
                    color: white;
                    font-size: 60px;
                }

                .image-modal__information__download {
                    color: white;
                    font-size: 32px;
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
