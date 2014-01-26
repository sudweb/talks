# Sud Web Talks

At [Sud Web](http://sudweb.fr), we manage *call for paper* via a Google Form.
This is nice and handy but totally unreadable.

This tool is a **frontend visualizer** of Sud Web talk proposals.
For the sake of our sanity.

## Install

Backend and frontend dependencies will be handled via `npm`.

```bash
npm install
```

## Deploy

To deploy any update to the live server, run the following command:

```bash
npm run deploy
```

## Usage

The `index.html` must be served over HTTP to work properly.

### Standard HTTP Server

```bash
open http://localhost/path/to/index.html?key=<Google Spreadsheet key>
```

### Embedded Server

```bash
npm start
open http://localhost:5000/index.html?key=<Google Spreadsheet key>
```