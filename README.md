# React Code Challenge

Welcome to our React Code Challenge. This code challenge was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Application

There are 3 pages available:

- Film List: List of popular movies
- Film Item: Detail of specific movie
- Favorites: List of movies which were set as favorites

We use the following API to retrieve the informations: [themoviedb.org](https://developers.themoviedb.org/3/getting-started/introduction).

## How to start

Download the repository as zip file to your local machine.

Install the required dependencies

```bash
npm install
```

Run the project

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

## Tests

The Application has cypress as framework.

First start the application and then run the following:

```
npm test
```

We will look at the code together and see what we can change, fix or implement.

# Tasks

## 1. Search does not work properly

### Steps to reproduce

1. Go to https://localhost:3000
2. Enter a first search like `Avatar`
3. Click on the button search
4. Enter a new search like `The Takedown`

### Expected

The list is updated and shows a list of movies according to the last search### What we see
The list did not change, we still see `Avatar` movies

## 2. Connect API to the frontend

If you click on a Movie Card Component, and you go to details page the reviews are missing. Make a call to the external API and show it in the frontend.

You may use this component to render the comment in your code.

```javascript
const renderComment = (reviews) => {
  return (
    <>
      {reviews.map((review) => (
        <Card>
          <Card.Body>
            <Card.Title>{review.author}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {review.author_details.name}
            </Card.Subtitle>
            <Card.Text>{review.author_details.rating}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
```

https://developers.themoviedb.org/3/movies/get-movie-reviews

## 3. Implement infinite scrolling

Implement inifite scrolling in the film list page.
Use the onRequest function to request new data, passing in updated value of page number variable.

## After implementation

After implementing/fixing the required features/bugs please send the edited zip file in email and this must be done in 2 hours after you recive the email with the link to this repository.

### GOOD LUCK
