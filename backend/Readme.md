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

# Example how to create new account using mutation updateAccount

```
mutation {
  updateAccount (record: {
    businessId: "62070077"
    firstName:"นาย"
    lastName: "ว่า"
  }){
    recordId
  }
}
```