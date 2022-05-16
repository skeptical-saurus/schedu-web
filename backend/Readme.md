# All field in account

```
{
    googleId
    businessId
    firstName
    lastName
    contact {
      email
      tel
    }
    image
    setting {
      displayTel
      weekendReceive
      activeTime {
        startAt
        endAt
      }
    }
  }
```

# Example how to query all accounts

```
query {
	accounts
  {
    googleId
    businessId
    firstName
    lastName
    contact {
      email
      tel
    }
    image
    setting {
      displayTel
      weekendReceive
      activeTime {
        startAt
        endAt
      }
    }
  }
}
```

# Example how to create new account using mutation createAccount

```
mutation {
  createAccount (record: {
    googleId: "109613832890761331119"
    businessId: "62070074"
    firstName:"นายทัสนัย"
    lastName: "ศรีสวัสดิ์"
    contact: {
      email: "62070074@it.kmitl.ac.th"
      tel: null
    }
    image: "https://lh3.googleusercontent.com/a-/AOh14GiR2Yf2lqH_wHzA7vVvPlyjDL7rnAmUJxRz3ixq=s96-c"
    setting: {
      displayTel: false
      weekendReceive: false
      activeTime: {
        startAt: "08:30"
        endAt: "16:30"
      }
    }
  }){
    recordId
  }
}
```