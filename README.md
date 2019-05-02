# Paybase

## Testing

You can test the app here : [link](https://paybase.wcastand.now.sh/graphql)
To test it locally you will need need a postgresSQL or use the one from Amazone RDS.
you `.env` should contain this :

```
DATABASE_URL=postgresql://postgres@localhost/paybase
NB_SPOT=30
```

### Run

install dependencies : `yarn`
run the server : `yarn dev`

to generate the types for typescript, use : `yarn generate`
(add `--watch` when you're coding)

## Choices

Since it's supposed to be used by manager and if it wasn't an exercices for paybase to see my way of thinking and code, i would have used a Headless CMS like Strapi.

Strapi provides, User (register, login, roles, ...) and make it easy to create models for talks, ...

That being said, i went with a more "code" solution and choose Graphql with Apollo. One of the reason is that i'm used to it and i am pretty efficient with it, also the end of the brief is talking about making a front end based on this api and Graphql/Apollo works really great for that.

Being mainly frontend this past year, when i started reading the brief, my first thought was Strapi with Gatsby, which is kind of reducing the API side to the minimum possible. So not the best idea for this exercise.

## Hosting

For the hosting, i just went for the easy to setup `now` by ZEIT, but any hosting service could have worked since there is not too much constraint. If i had to do the front end too, i would have choose Netlify or Firebase hosting.

Using lambda, the list of services i think of was :

- Zeit (AWS)
- Netlify (AWS)
- Architect (AWS)
- AWS
- Firebase (Google)

## DB

Since there is some relation into the logic (talks, speakers, attendees, ...) a relational DB was making a lot of sense and PostgresSQL is great. And once again, i'm used to PostgresSQL so this makes it easier for me to start really quick.

If i was on Google, i would have go with Firestore since it's more adapted for relation that firebase.
If using Architect, the choice would have been probably DynamoDB since it's integrated in the system and the complexity of the api makes it pretty easy to work with any relational or document based DB.

## What could be next

With more time, i would probably take a look at spending time with way better security(secrets, env, ...)
I would probably use one model for Attendees and Speakers at some point since they are both users.
Most of the work would depend of what we want on the front end side too.
Maybe allow for example to create speakers and talk at the same time.

## Issues

Since it was a pretty basic API and really close to what I'm used to do, i didn't really encounter any issues. So most of the "issues" were to guess what paybase is looking for and which tech stack to use.

## Example of query

Any mutation except logging in and registering needs an Authorization header :

```
headers: {
  "Authorization":"Bearer your_token"
}
```

#### login as admin

```
mutation{
  adminLogin(email:"manager@manage.com", password:"mypassword"){
    token
    user{ id }
  }
}
```

#### register as an attendee

```
mutation{
  register(email:"attendee@attendee.com", password:"mypassword"){
    token
    user{ id }
  }
}
```

#### login as an attendee

```
mutation{
  login(email:"attendee@attendee.com", password:"mypassword"){
    token
    user{ id }
  }
}
```

#### create a speaker as an admin

```
mutation{
 createSpeaker(speaker:{firstname: "Will", lastname:"Cast", bio:"Awesome", avatar:"https://www.whatsappprofiledpimages.com/wp-content/uploads/2018/07/awesome-profile-pics5.jpg", talks:[]}){
    id
    firstname
  }
}
```

#### create a talk as an admin

```
mutation{
  createTalk(talk:{title:"How to be awesome", description:"What to do in life", startDate:"2019-12-03T10:15:30Z", duration:1234567, speakers:[1]}){
    id
    title
  }
}
```

#### rsvp as a attendee to a talk

```
mutation{
  rsvp(talkId:1)
}
```

#### get the list of talks

```
{
  talks(limit: 10, offset: 0){
    items{
      title
      spotLeft
    }
    totalResult
  }
}
```

#### get one talk

```
{
  talk(id: 1){
    title
    spotLeft
  }
}
```
