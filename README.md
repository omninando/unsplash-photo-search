# Photo Based Search

This project consists in

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To get the project up and running you need to have `node` and `npm` installed on your machine.

### Installing

To start the project you will need to run `npm install` to download all dependencies.

Then, to run the `dev` environment locally you should execute:

```
npm run dev
```

For the production environment, first run:

```
npm run build
```
then:

```
npm start
```

## Deployment

This project is currently deployed at [Heroku] (https://unsplash-photo-search.herokuapp.com/)


## Built With

* [Create Next App](https://open.segment.com/create-next-app) - Boilerplate which uses [Next.js](https://github.com/zeit/next.js/) for server-side rendering, and [create-react-app](https://github.com/facebookincubator/create-react-app) to start a react project.
* [Google Cloud Vision API](https://cloud.google.com/vision/) - To get the labels based on the images uploaded
* [Unsplash API](https://unsplash.com/developers) - To search for wallpapers

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Author

* **Fernando Coelho** - [nandoacoelho](https://github.com/nandoacoelho)