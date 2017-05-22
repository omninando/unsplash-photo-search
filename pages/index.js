import React from 'react'
import {Head, Nav} from '../components'
import ImageSearcher from '../components/imageSearcher'

class Index extends React.Component {
    render() {
        return <div className="hero">
            <Head
                title="Unsplash Photo Search"
                description="Search images on Unsplash based on a photo you upload."
                url="https://unsplash-photo-search.herokuapp.com/"
                ogImage="/static/screenshot.png"
            />
            <ImageSearcher />
            <style jsx>{`
                .hero {
                    color: #333;
                    background: #000;
                    height: 100%;
                    left: 0;
                    overflow-x: hidden;
                    position: absolute;
                    top: 0;
                    width: 100%;
                }

                .title {
                    font-family: -apple-system,BlinkMacSystemFont,San Francisco,Helvetica Neue,Helvetica,Ubuntu,Roboto,Noto,Segoe UI,Arial,sans-serif;
                    font-size: 48px;
                    line-height: 1.15;
                    margin: 0;
                    padding-top: 80px;
                    width: 100%;
                }

                .title, .description {
                    text-align: center;
                }

                html, body, div, span, applet, object, iframe,
                h1, h2, h3, h4, h5, h6, p, blockquote, pre,
                a, abbr, acronym, address, big, cite, code,
                del, dfn, em, img, ins, kbd, q, s, samp,
                small, strike, strong, sub, sup, tt, var,
                b, u, i, center,
                dl, dt, dd, ol, ul, li,
                fieldset, form, label, legend,
                table, caption, tbody, tfoot, thead, tr, th, td,
                article, aside, canvas, details, embed,
                figure, figcaption, footer, header, hgroup,
                menu, nav, output, ruby, section, summary,
                time, mark, audio, video {
                    margin: 0;
                    padding: 0;
                    border: 0;
                    font-size: 100%;
                    font: inherit;
                    vertical-align: baseline;
                    text-rendering: optimizeLegibility !important;
                    -webkit-font-smoothing: antialiased !important;
                }

                article, aside, details, figcaption, figure,
                footer, header, hgroup, menu, nav, section {
                    display: block;
                }

                body,
                html {
                    height: 100%;
                    width: 100%;
                }

                main {
                    height: auto;
                    width: 100%;
                    overflow: auto;
                }

                body {
                    line-height: 1;
                    overflow-x: hidden;
                }

                ol, ul {
                    list-style: none;
                }

                blockquote, q {
                    quotes: none;
                }

                blockquote:before, blockquote:after,
                q:before, q:after {
                    content: none;
                }

                table {
                    border-collapse: collapse;
                    border-spacing: 0;
                }

                html {
                    box-sizing: border-box;
                }

                *, *:before, *:after {
                    box-sizing: inherit;
                    outline: none;
                    -webkit-overflow-scrolling: touch;
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                    -webkit-touch-callout: none;
                }

                *,
                *::before,
                *::after {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font: normal 16px/1.5 "Helvetica Neue", sans-serif;
                    overflow-x: hidden;
                    background-color: #EEEEEE;
                }

                button {
                    background: transparent;
                    outline: none;
                    border: none;
                }
              `}</style>
        </div>
    }
}

export default Index;