import ImageSearcherzone from 'react-dropzone'
import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, resolvedGetImages, getImages, serverRenderClock } from '../store'
import withRedux from 'next-redux-wrapper'
import ImagesList from '../components/imagesList'

class ImageSearcher extends React.Component {
    static getInitialProps ({ store }) {
        store.dispatch(getImages());
        store.dispatch(resolvedGetImages());
    }

    constructor() {
        super();
        this.state = {
            files: [],
            annotations: [],
            backgroundImage: {} ,
            images: [],
            searched: false,
            title: 'Drop an image to search',
            subtitle: '',
            backgroundStyle: {
                backgroundImage: "url(https://source.unsplash.com/random)",
                backgroundSize: 'cover'
            },
            dropzoneStyle: {
                background: 'transparent',
                color: '#fff',
                fontSize: '60px',
                fontWeight: '600',
                height: 'auto',
                left: '0',
                overflow: 'hidden',
                padding: '3em 0 2em',
                position: 'relative',
                textAlign: 'center',
                top: '0',
                transition: '0.5s ease-out',
                width: '100vw',
                zIndex: '2',
            }
        }
    }

    onDrop(files) {
        this.setState({
            files,
            backgroundImage: files,
            backgroundStyle: {
                backgroundImage: 'url('+ files[0].preview +')',
                backgroundSize: 'cover'
            },
            title: 'Searching...'
        });

        getImages(files[0])
            .then((data) => {
                resolvedGetImages(data.responses[0].labelAnnotations[0].description)
                    .then((images) => {
                        this.setState({
                            images,
                            searched: true,
                            title: 'Results based on the image uploaded',
                            subtitle: 'Click or drop here to search again',
                            dropzoneStyle: {
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)',
                                color: '#fff',
                                fontSize: '40px',
                                fontWeight: '600',
                                height: 'auto',
                                left: '0',
                                overflow: 'hidden',
                                padding: '0',
                                position: 'relative',
                                textAlign: 'center',
                                top: '0',
                                transition: '0.5s',
                                width: '100vw',
                                zIndex: '20',
                            }
                        });
                    });
            });
    }

    render() {
        const {
            backgroundStyle,
            dropzoneStyle,
            title,
            subtitle,
            searched
        } = this.state;
        let modifier = searched ? "dropzone__background -searched" : "dropzone__background",
            modifierTitle = searched ? "dropzone__title -search" : "dropzone__title";
        return <section className="container-wrapper">
            <div className={modifier} style={backgroundStyle}></div>
            <div className="dropzone">
                <ImageSearcherzone
                    style={dropzoneStyle}
                    onDrop={this.onDrop.bind(this)}
                    accept="image/jpeg, image/png">
                    <div className="dropzone__search-container"></div>
                    <p className={modifierTitle}>{title}</p>
                    <p className="dropzone__subtitle">{subtitle}</p>
                </ImageSearcherzone>
                <ImagesList images={this.state.images}/>
            </div>


            <style jsx>{`
                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                        transform: scale(1);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1.1);
                    }
                }

                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(50%)
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0)
                    }
                }

                .container-wrapper {
                    width: 100vw;
                }

                .dropzone {
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    font-family: -apple-system,BlinkMacSystemFont,San Francisco,Helvetica Neue,Helvetica,Ubuntu,Roboto,Noto,Segoe UI,Arial,sans-serif;
                    justify-content: center;
                    text-align: center;
                    cursor: pointer;
                    width: 100vw;
                }

                .dropzone__background {
                    background-size: cover;
                    color: #333;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: 100%;
                    position: fixed;
                    width: 100vw;
                    opacity: 0;
                    animation: fadeIn 15s cubic-bezier(0.19, 1, 0.22, 1);
                    animation-delay: .3s;
                    animation-fill-mode: forwards;
                }

                .dropzone__background::after {
                    background: #000000;
                    content: '';
                    display: block;
                    height: 100%;
                    left: 0;
                    opacity: 0.3;
                    position: absolute;
                    top: 0;
                    transition: 0.3s;
                    width: 100%;
                    z-index: 1;
                }

                .-searched::after {
                    background: #000000;
                    content: '';
                    display: block;
                    height: 100%;
                    left: 0;
                    opacity: 0.8;
                    position: absolute;
                    top: 0;
                    width: 100%;
                    z-index: 1;
                }

                .dropzone__title {
                    animation: fadeInUp 1s ease-in;
                    animation-delay: 0.5s;
                    font-size: 32px;
                    padding: 0 20px;
                }

                @media (min-width: 1024px) {
                    .dropzone__title {
                        font-size: 70px;
                        padding: 0 30%;
                    }

                    .dropzone__title.-search {
                        font-size: 40px;
                        padding: 0 10%;
                    }
                }

                .dropzone__subtitle {
                    font-size: 18px;
                    font-weight: 300;
                }

                .dropzone > div {
                    border: 0;
                    overflow: hidden;
                    z-index: 2;
                }
            `}</style>
        </section>
    }
}

const mapStateToProps = state => {
    return {
        topic: state.topic,
        displayMode: state.displayMode
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getImages: bindActionCreators(getImages, dispatch),
        resolvedGetImages: bindActionCreators(resolvedGetImages, dispatch)
    }
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(ImageSearcher)
