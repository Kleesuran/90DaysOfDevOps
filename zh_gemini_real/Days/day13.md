---
title: '#90DaysOfDevOps - Tweet your progress with our new App - Day 13'
published: false
description: 90DaysOfDevOps - Tweet your progress with our new App
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048865
---

## Tweet your progress with our new App

On the final day of looking into this programming language, we have only just touched the surface here of the language but it is at that start that I think we need to get interested and excited and want to dive more into it.
在研究这种编程语言的最后一天，我们才刚刚触及这门语言的皮毛，但我认为正是从开始阶段，我们需要产生兴趣和兴奋感，并想要深入研究它。

Over the last few days, we have taken a small idea for an application and we have added functionality to it, in this session I want to take advantage of those packages we mentioned and create the functionality for our app to not only give you the update of your progress on screen but also send a tweet with the details of the challenge and your status.
在过去的几天里，我们针对一个小的应用想法添加了功能。在本次会话中，我想利用我们提到的那些包，为我们的应用创建功能，使其不仅能够在屏幕上显示你的进度更新，还能发送一条包含挑战详情和你的状态的推文。

## Adding the ability to tweet your progress

The first thing we need to do is set up our developer API access with Twitter for this to work.
要实现此功能，我们需要做的第一件事是设置我们在 Twitter 上的开发者 API 访问权限。

Head to the [Twitter Developer Platform](https://developer.twitter.com) and sign in with your Twitter handle and details. Once in you should see something like the below without the app that I already have created.
前往 [Twitter Developer Platform](https://developer.twitter.com)，使用你的 Twitter 用户名和详细信息登录。登录后，你应该会看到类似下面的界面，只是没有我已经创建的那个应用。

![](Images/Day13_Go1.png)

From here you may also want to request elevated access, this might take some time but it was very fast for me.
从这里你可能还想申请更高的访问权限，这可能需要一些时间，但对我来说速度很快。

Next, we should select Projects & Apps and create our App. Limits are depending on the account access you have, with essential you only have one app and one project and with elevated you can have 3 apps.
接下来，我们应该选择“Projects & Apps”（项目和应用）并创建我们的应用。限制取决于你拥有的账户访问权限，如果是基本权限（essential），你只能拥有一个应用和一个项目；如果是提升权限（elevated），你可以拥有 3 个应用。

![](Images/Day13_Go2.png)

Give your application a name
为你的应用命名。

![](Images/Day13_Go3.png)

You will be then given these API tokens, you must save these somewhere secure. (I have since deleted this app) We will need these later with our Go Application.
然后你会获得这些 API 令牌，你必须将它们安全地保存在某个地方。（我已经删除了这个应用）我们稍后在 Go 应用程序中会用到它们。

![](Images/Day13_Go4.png)

Now we have our app created,(I did have to change my app name as the one in the screenshot above was already taken, these names need to be unique)
现在我们已经创建了应用（我不得不更改我的应用名称，因为上面截图中的名称已被占用，这些名称需要是唯一的）。

![](Images/Day13_Go5.png)

The keys that we gathered before are known as our consumer keys and we will also need our access token and secrets. We can gather this information using the "Keys & Tokens" tab.
我们之前收集的密钥被称为“消费者密钥”（consumer keys），我们还需要访问令牌和密钥（access token and secrets）。我们可以使用“Keys & Tokens”选项卡来收集这些信息。

![](Images/Day13_Go6.png)

Ok, we are done in the Twitter developer portal for now. Make sure you keep your keys safe because we will need them later.
好的，我们暂时完成了 Twitter 开发者门户中的操作。请确保你的密钥安全，因为我们稍后会用到它们。

## Go Twitter Bot

Remember the code we are starting within our application as well [day13_example1](Go/day13_example1.go) but first, we need to check we have the correct code to make something tweet
记住我们应用中开始使用的代码 [day13_example1](Go/day13_example1.go)，但首先，我们需要确认我们有正确的代码来发送推文。

We now need to think about the code to get our output or message to Twitter in the form of a tweet. We are going to be using [go-twitter](https://github.com/dghubble/go-twitter) This is a Go client library for the Twitter API.
现在我们需要考虑代码如何将我们的输出或消息以推文的形式发送到 Twitter。我们将使用 [go-twitter](https://github.com/dghubble/go-twitter)，这是一个用于 Twitter API 的 Go 客户端库。

To test this before putting this into our main application, I created a new directory in our `src` folder called go-twitter-bot, issued the `go mod init github.com/michaelcade/go-Twitter-bot` on the folder which then created a `go.mod` file and then we can start writing our new main.go and test this out.
为了在将其放入我们的主应用程序之前进行测试，我在 `src` 文件夹中创建了一个名为 go-twitter-bot 的新目录，在该目录中执行了 `go mod init github.com/michaelcade/go-Twitter-bot` 命令，这创建了一个 `go.mod` 文件，然后我们就可以开始编写新的 main.go 并进行测试了。

We now need those keys, tokens and secrets we gathered from the Twitter developer portal. We are going to set these in our environment variables. This will depend on the OS you are running:
现在我们需要从 Twitter 开发者门户收集到的那些密钥、令牌和密文。我们将在环境变量中设置它们。具体取决于你运行的操作系统：

I have had a few questions regarding environment variables, here is a blog post that goes into more detail so you can understand what is happening. [How To Set Environment Variables](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html)
我收到了一些关于环境变量的问题，这里有一篇更详细的博客文章，可以帮助你理解正在发生的事情。[How To Set Environment Variables](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html)

Windows

```
set CONSUMER_KEY
set CONSUMER_SECRET
set ACCESS_TOKEN
set ACCESS_TOKEN_SECRET
```

Linux / macOS

```
export CONSUMER_KEY
export CONSUMER_SECRET
export ACCESS_TOKEN
export ACCESS_TOKEN_SECRET
```

At this stage, you can take a look at [day13_example2](Go/day13_example2.go) at the code but you will see here that we are using a struct to define our keys, secrets and tokens.
在这个阶段，你可以查看 [day13_example2](Go/day13_example2.go) 中的代码，但你会看到我们正在使用一个结构体（struct）来定义我们的密钥、密文和令牌。

We then have a `func` to parse those credentials and make that connection to the Twitter API
然后我们有一个 `func` 来解析这些凭证并建立与 Twitter API 的连接。

Then based on the success we will then send a tweet.
随后，如果成功，我们将发送一条推文。

```
package main

import (
    // other imports
    "fmt"
    "log"
    "os"

    "github.com/dghubble/go-twitter/twitter"
    "github.com/dghubble/oauth1"
)

// Credentials stores all of our access/consumer tokens
// and secret keys needed for authentication against
// the twitter REST API.
type Credentials struct {
    ConsumerKey       string
    ConsumerSecret    string
    AccessToken       string
    AccessTokenSecret string
}

// getClient is a helper function that will return a twitter client
// that we can subsequently use to send tweets, or to stream new tweets
// this will take in a pointer to a Credential struct which will contain
// everything needed to authenticate and return a pointer to a twitter Client
// or an error
func getClient(creds *Credentials) (*twitter.Client, error) {
    // Pass in your consumer key (API Key) and your Consumer Secret (API Secret)
    config := oauth1.NewConfig(creds.ConsumerKey, creds.ConsumerSecret)
    // Pass in your Access Token and your Access Token Secret
    token := oauth1.NewToken(creds.AccessToken, creds.AccessTokenSecret)

    httpClient := config.Client(oauth1.NoContext, token)
    client := twitter.NewClient(httpClient)

    // Verify Credentials
    verifyParams := &twitter.AccountVerifyParams{
        SkipStatus:   twitter.Bool(true),
        IncludeEmail: twitter.Bool(true),
    }

    // we can retrieve the user and verify if the credentials
    // we have used successfully allow us to log in!
    user, _, err := client.Accounts.VerifyCredentials(verifyParams)
    if err != nil {
        return nil, err
    }

    log.Printf("User's ACCOUNT:\n%+v\n", user)
    return client, nil
}
func main() {
    fmt.Println("Go-Twitter Bot v0.01")
    creds := Credentials{
        AccessToken:       os.Getenv("ACCESS_TOKEN"),
        AccessTokenSecret: os.Getenv("ACCESS_TOKEN_SECRET"),
        ConsumerKey:       os.Getenv("CONSUMER_KEY"),
        ConsumerSecret:    os.Getenv("CONSUMER_SECRET"),
    }

    client, err := getClient(&creds)
    if err != nil {
        log.Println("Error getting Twitter Client")
        log.Println(err)
    }

    tweet, resp, err := client.Statuses.Update("A Test Tweet from the future, testing a #90DaysOfDevOps Program that tweets, tweet tweet", nil)
    if err != nil {
        log.Println(err)
    }
    log.Printf("%+v\n", resp)
    log.Printf("%+v\n", tweet)
}
```

The above will either give you an error based on what is happening or it will succeed and you will have a tweet sent with the message outlined in the code.
上述代码要么根据情况返回错误，要么会成功，并且你会看到一条附带代码中所示消息的推文已发送。

## Pairing the two together - Go-Twitter-Bot + Our App

Now we need to merge these two in our `main.go` I am sure someone out there is screaming that there is a better way of doing this and please comment on this as you can have more than one `.go` file in a project it might make sense but this works.
现在我们需要在 `main.go` 中将这两部分合并。我相信有人会大喊有更好的方法来完成这件事，并且请就此发表评论，因为在一个项目中可以有多个 `.go` 文件，这可能更合理，但目前的方法是可行的。

You can see the merged codebase [day13_example3](Go/day13_example3.go) but I will also show it below.
你可以查看合并后的代码库 [day13_example3](Go/day13_example3.go)，但我也会在下面展示它。

```
package main

import (
    // other imports
    "fmt"
    "log"
    "os"

    "github.com/dghubble/go-twitter/twitter"
    "github.com/dghubble/oauth1"
)

// Credentials stores all of our access/consumer tokens
// and secret keys needed for authentication against
// the twitter REST API.
type Credentials struct {
    ConsumerKey       string
    ConsumerSecret    string
    AccessToken       string
    AccessTokenSecret string
}

// getClient is a helper function that will return a twitter client
// that we can subsequently use to send tweets, or to stream new tweets
// this will take in a pointer to a Credential struct which will contain
// everything needed to authenticate and return a pointer to a twitter Client
// or an error
func getClient(creds *Credentials) (*twitter.Client, error) {
    // Pass in your consumer key (API Key) and your Consumer Secret (API Secret)
    config := oauth1.NewConfig(creds.ConsumerKey, creds.ConsumerSecret)
    // Pass in your Access Token and your Access Token Secret
    token := oauth1.NewToken(creds.AccessToken, creds.AccessTokenSecret)

    httpClient := config.Client(oauth1.NoContext, token)
    client := twitter.NewClient(httpClient)

    // Verify Credentials
    verifyParams := &twitter.AccountVerifyParams{
        SkipStatus:   twitter.Bool(true),
        IncludeEmail: twitter.Bool(true),
    }

    // we can retrieve the user and verify if the credentials
    // we have used successfully allow us to log in!
    user, _, err := client.Accounts.VerifyCredentials(verifyParams)
    if err != nil {
        return nil, err
    }

    log.Printf("User's ACCOUNT:\n%+v\n", user)
    return client, nil
}
func main() {
    creds := Credentials{
        AccessToken:       os.Getenv("ACCESS_TOKEN"),
        AccessTokenSecret: os.Getenv("ACCESS_TOKEN_SECRET"),
        ConsumerKey:       os.Getenv("CONSUMER_KEY"),
        ConsumerSecret:    os.Getenv("CONSUMER_SECRET"),
    }
    {
        const DaysTotal int = 90
        var remainingDays uint = 90
        challenge := "#90DaysOfDevOps"

        fmt.Printf("Welcome to the %v challenge.\nThis challenge consists of %v days\n", challenge, DaysTotal)

        var TwitterName string
        var DaysCompleted uint

        // asking for user input
        fmt.Println("Enter Your Twitter Handle: ")
        fmt.Scanln(&TwitterName)

        fmt.Println("How many days have you completed?: ")
        fmt.Scanln(&DaysCompleted)

        // calculate remaining days
        remainingDays = remainingDays - DaysCompleted

        //fmt.Printf("Thank you %v for taking part and completing %v days.\n", TwitterName, DaysCompleted)
        //fmt.Printf("You have %v days remaining for the %v challenge\n", remainingDays, challenge)
        // fmt.Println("Good luck")

        client, err := getClient(&creds)
        if err != nil {
            log.Println("Error getting Twitter Client, this is expected if you did not supply your Twitter API tokens")
            log.Println(err)
        }

        message := fmt.Sprintf("Hey I am %v I have been doing the %v for %v days and I have %v Days left", TwitterName, challenge, DaysCompleted, remainingDays)
        tweet, resp, err := client.Statuses.Update(message, nil)
        if err != nil {
            log.Println(err)
        }
        log.Printf("%+v\n", resp)
        log.Printf("%+v\n", tweet)
    }

}
```

The outcome of this should be a tweet but if you did not supply your environment variables then you should get an error like the one below.
结果应该是一条推文，但如果你没有提供环境变量，那么你应该会收到类似下面的错误。

![](Images/Day13_Go7.png)

Once you have fixed that or if you choose not to authenticate with Twitter then you can use the code we finished with yesterday. The terminal output on success will look similar to this:
一旦你解决了这个问题，或者如果你选择不使用 Twitter 身份验证，那么你可以使用我们昨天完成的代码。成功时的终端输出将类似于这样：

![](Images/Day13_Go8.png)

The resulting tweet should look something like this:
最终的推文应该看起来像这样：

![](Images/Day13_Go9.png)

## How to compile for multiple OSs

I next want to cover the question, "How do you compile for multiple Operating Systems?" The great thing about Go is that it can easily compile for many different Operating Systems. You can get a full list by running the following command:
接下来我想讨论一个问题：“如何为多个操作系统进行编译？” Go 语言的强大之处在于它可以轻松地为许多不同的操作系统进行编译。你可以通过运行以下命令获取完整列表：

```
go tool dist list
```

Using our `go build` commands so far is great and it will use the `GOOS` and `GOARCH` environment variables to determine the host machine and what the build should be built for. But we can also create other binaries by using the code below as an example.
到目前为止，使用我们的 `go build` 命令效果很好，它会使用 `GOOS` 和 `GOARCH` 环境变量来确定主机以及构建目标。但我们也可以使用下面的代码示例来创建其他二进制文件。

```
GOARCH=amd64 GOOS=darwin go build -o ${BINARY_NAME}_0.1_darwin main.go
GOARCH=amd64 GOOS=linux go build -o ${BINARY_NAME}_0.1_linux main.go
GOARCH=amd64 GOOS=windows go build -o ${BINARY_NAME}_0.1_windows main.go
GOARCH=arm64 GOOS=linux go build -o ${BINARY_NAME}_0.1_linux_arm64 main.go
GOARCH=arm64 GOOS=darwin go build -o ${BINARY_NAME}_0.1_darwin_arm64 main.go
```

This will then give you binaries in your directory for all of the above platforms. You can then take this and create a makefile to build these binaries whenever you add new features and functionality to your code. I have included the [makefile](Go/makefile)
这将在你的目录中为上述所有平台生成二进制文件。然后你可以利用这一点创建一个 makefile，以便在代码中添加新特性和功能时构建这些二进制文件。我已经包含了 [makefile](Go/makefile)。

This is what I have used to create the releases you can now see on the [repository](https://github.com/MichaelCade/90DaysOfDevOps/releases)
这就是我用来创建现在可以在 [repository](https://github.com/MichaelCade/90DaysOfDevOps/releases) 上看到的发布版本的方法。

## Resources

- [StackOverflow 2021 Developer Survey](https://insights.stackoverflow.com/survey/2021)
- [Why we are choosing Golang to learn](https://www.youtube.com/watch?v=7pLqIIAqZD4&t=9s)
- [Jake Wright - Learn Go in 12 minutes](https://www.youtube.com/watch?v=C8LgvuEBraI&t=312s)
- [Techworld with Nana - Golang full course - 3 hours 24 mins](https://www.youtube.com/watch?v=yyUHQIec83I)
- [**NOT FREE** Nigel Poulton Pluralsight - Go Fundamentals - 3 hours 26 mins](https://www.pluralsight.com/courses/go-fundamentals)
- [FreeCodeCamp - Learn Go Programming - Golang Tutorial for Beginners](https://www.youtube.com/watch?v=YS4e4q9oBaU&t=1025s)
- [Hitesh Choudhary - Complete playlist](https://www.youtube.com/playlist?list=PLRAV69dS1uWSR89FRQGZ6q9BR2b44Tr9N)
- [A great repo full of all things DevOps & exercises](https://github.com/bregman-arie/devops-exercises)
- [GoByExample - Example based learning](https://gobyexample.com/)
- [go.dev/tour/list](https://go.dev/tour/list)
- [go.dev/learn](https://go.dev/learn/)

This wraps up the Programming language for 7 days! So much more that can be covered and I hope you have been able to continue through the content above and be able to understand some of the other aspects of the Go programming language.
编程语言部分的 7 天内容就到此结束了！还有很多可以涵盖的内容，我希望你能够继续学习上面的内容，并能够理解 Go 编程语言的其他一些方面。

Next, we take our focus into Linux and some of the fundamentals that we should all know there.
接下来，我们将把重点转向 Linux 以及我们都应该了解的一些基础知识。

See you on [Day 14](day14.md).
第 14 天见 [Day 14](day14.md)。
