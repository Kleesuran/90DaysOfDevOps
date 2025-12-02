---
title: '#90DaysOfDevOps - Data Services - Day 85'
published: false
description: 90DaysOfDevOps - Data Services
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1048781
---

## Data Services

Databases are going to be the most common data service that we come across in our environments. I wanted to take this session to explore some of those different types of Databases and some of the use cases they each have. Some we have used and seen throughout the challenge.
数据库将是我们环境中遇到的最常见的数据服务。我想利用这次会议来探讨一些不同类型的数据库，以及它们各自的用例。其中一些我们在整个挑战中已经使用和见过。

From an application development point of view choosing the right data service or database is going to be a huge decision when it comes to the performance and scalability of your application.
从应用程序开发的角度来看，选择合适的数据服务或数据库对于应用程序的性能和可扩展性来说是一个巨大的决定。

https://www.youtube.com/watch?v=W2Z7fbCLSTw

### Key-value

A key-value database is a type of nonrelational database that uses a simple key-value method to store data. A key-value database stores data as a collection of key-value pairs in which a key serves as a unique identifier. Both keys and values can be anything, ranging from simple objects to complex compound objects. Key-value databases are highly partitionable and allow horizontal scaling at scales that other types of databases cannot achieve.
键值数据库是一种非关系型数据库，它使用简单的键值方法来存储数据。键值数据库将数据存储为键值对的集合，其中键充当唯一标识符。键和值都可以是任何东西，从简单的对象到复杂的复合对象。键值数据库具有高度可分区性，并允许在其他类型数据库无法实现的规模上进行水平扩展。

An example of a Key-Value database is Redis.
Redis 是键值数据库的一个例子。

_Redis is an in-memory data structure store, used as a distributed, in-memory key–value database, cache and message broker, with optional durability. Redis supports different kinds of abstract data structures, such as strings, lists, maps, sets, sorted sets, HyperLogLogs, bitmaps, streams, and spatial indices._
_Redis是一个内存数据结构存储，用作分布式、内存中的键值数据库、缓存和消息代理，并具有可选的持久性。Redis支持不同种类的抽象数据结构，例如字符串、列表、映射、集合、有序集合、HyperLogLogs、位图、流和空间索引。_

![](Images/Day85_Data1.png)

As you can see from the description of Redis this means that our database is fast but we are limited on space as a trade-off. Also, no queries or joins which means data modelling options are very limited.
正如您从 Redis 的描述中看到的那样，这意味着我们的数据库速度很快，但作为权衡，我们在空间上受到限制。此外，没有查询或连接，这意味着数据建模选项非常有限。

Best for:
最适用于：

- Caching
- 缓存
- Pub/Sub
- 发布/订阅
- Leaderboards
- 排行榜
- Shopping carts
- 购物车

Generally used as a cache above another persistent data layer.
通常用作位于另一个持久数据层之上的缓存。

### Wide Column

A wide-column database is a NoSQL database that organises data storage into flexible columns that can be spread across multiple servers or database nodes, using multi-dimensional mapping to reference data by column, row, and timestamp.
宽列数据库是一种 NoSQL 数据库，它将数据存储组织成灵活的列，这些列可以分布在多个服务器或数据库节点上，使用多维映射通过列、行和时间戳来引用数据。

_Cassandra is a free and open-source, distributed, wide-column store, NoSQL database management system designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure._
_Cassandra 是一个免费的、开源的、分布式的宽列存储 NoSQL 数据库管理系统，旨在跨多个商用服务器处理大量数据，提供高可用性，没有单点故障。_

![](Images/Day85_Data2.png)

No schema which means can handle unstructured data however this can be seen as a benefit to some workloads.
没有模式（Schema），这意味着它可以处理非结构化数据，但这在某些工作负载中可以被视为一个优势。

Best for:
最适用于：

- Time-Series
- 时间序列
- Historical Records
- 历史记录
- High-Write, Low-Read
- 高写入、低读取

### Document

A document database (also known as a document-oriented database or a document store) is a database that stores information in documents.
文档数据库（也称为面向文档的数据库或文档存储）是一种将信息存储在文档中的数据库。

_MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License._
_MongoDB 是一种源代码可用的跨平台面向文档的数据库程序。MongoDB 被归类为 NoSQL 数据库程序，它使用类 JSON 文档，并具有可选的模式。MongoDB 由 MongoDB 公司开发，并根据服务器端公共许可证授权。_

![](Images/Day85_Data3.png)

NoSQL document databases allow businesses to store simple data without using complex SQL codes. Quickly store with no compromise to reliability.
NoSQL 文档数据库允许企业存储简单数据，而无需使用复杂的 SQL 代码。快速存储，同时不影响可靠性。

Best for:
最适用于：

- Most Applications
- 大多数应用程序
- Games
- 游戏
- Internet of Things
- 物联网

### Relational

If you are new to databases but you know of them I guess that you have come across a relational database.
如果您是数据库新手，但听说过它们，我猜您遇到过关系型数据库。

A relational database is a digital database based on the relational model of data, as proposed by E. F. Codd in 1970. A system used to maintain relational databases is a relational database management system. Many relational database systems have the option of using SQL for querying and maintaining the database.
关系型数据库是基于 E. F. Codd 在 1970 年提出的数据关系模型的数字数据库。用于维护关系型数据库的系统是关系型数据库管理系统。许多关系型数据库系统可以选择使用 SQL 来查询和维护数据库。

_MySQL is an open-source relational database management system. Its name is a combination of "My", the name of co-founder Michael Widenius's daughter, and "SQL", the abbreviation for Structured Query Language._
_MySQL 是一种开源关系型数据库管理系统。它的名字是“My”（联合创始人 Michael Widenius 女儿的名字）和“SQL”（Structured Query Language，结构化查询语言的缩写）的组合。_

MySQL is one example of a relational database there are lots of other options.
MySQL 是关系型数据库的一个例子，还有很多其他选择。

![](Images/Day85_Data4.png)

Whilst researching relational databases the term or abbreviation **ACID** has been mentioned a lot, (atomicity, consistency, isolation, durability) is a set of properties of database transactions intended to guarantee data validity despite errors, power failures, and other mishaps. In the context of databases, a sequence of database operations that satisfies the ACID properties (which can be perceived as a single logical operation on the data) is called a transaction. For example, a transfer of funds from one bank account to another, even involving multiple changes such as debiting one account and crediting another, is a single transaction.
在研究关系型数据库时，**ACID**（原子性、一致性、隔离性、持久性）这个术语或缩写被多次提及，它是一组数据库事务属性，旨在保证数据有效性，即使发生错误、断电和其他意外情况。在数据库环境中，满足 ACID 属性（可以被视为对数据的单个逻辑操作）的一系列数据库操作称为事务。例如，将资金从一个银行账户转移到另一个银行账户，即使涉及借记一个账户和贷记另一个账户等多次更改，也是一个单一事务。

Best for:
最适用于：

- Most Applications (It has been around for years, doesn't mean it is the best)
- 大多数应用程序（它已经存在多年，但这并不意味着它是最好的）

It is not ideal for unstructured data or the ability to scale is where some of the other NoSQL mentions give a better ability to scale for certain workloads.
对于非结构化数据或可扩展性而言，它并不理想，这也是其他一些 NoSQL 数据库在某些工作负载下提供更好扩展能力的原因。

### Graph

A graph database stores nodes and relationships instead of tables, or documents. Data is stored just like you might sketch ideas on a whiteboard. Your data is stored without restricting it to a pre-defined model, allowing a very flexible way of thinking about and using it.
图数据库存储节点和关系，而不是表或文档。数据的存储方式就像您在白板上勾勒想法一样。您的数据存储不受预定义模型的限制，从而允许以非常灵活的方式思考和使用数据。

_Neo4j is a graph database management system developed by Neo4j, Inc. Described by its developers as an ACID-compliant transactional database with native graph storage and processing_
_Neo4j 是由 Neo4j 公司开发的图数据库管理系统。其开发者将其描述为具有原生图存储和处理能力的、符合 ACID 标准的事务性数据库。_

Best for:
最适用于：

- Graphs
- 图
- Knowledge Graphs
- 知识图谱
- Recommendation Engines
- 推荐引擎

### Search Engine

In the last section, we used a Search Engine database in the way of Elasticsearch.
在上一节中，我们使用了 Elasticsearch 这种搜索引起数据库。

A search-engine database is a type of non-relational database that is dedicated to the search for data content. Search-engine databases use indexes to categorise similar characteristics among data and facilitate search capability.
搜索引擎数据库是一种非关系型数据库，专门用于数据内容的搜索。搜索引擎数据库使用索引来对数据中的相似特征进行分类，并促进搜索能力。

_Elasticsearch is a search engine based on the Lucene library. It provides a distributed, multitenant-capable full-text search engine with an HTTP web interface and schema-free JSON documents._
_Elasticsearch 是一个基于 Lucene 库的搜索引擎。它提供了一个分布式、多租户的全文搜索引擎，具有 HTTP Web 接口和无模式的 JSON 文档。_

Best for:
最适用于：

- Search Engines
- 搜索引擎
- Typeahead
- 预先输入 (Typeahead)
- Log search
- 日志搜索

### Multi-model

A multi-model database is a database management system designed to support multiple data models against a single, integrated backend. In contrast, most database management systems are organized around a single data model that determines how data can be organized, stored, and manipulated. Document, graph, relational, and key–value models are examples of data models that may be supported by a multi-model database.
多模型数据库是一种数据库管理系统，旨在针对单个集成后端支持多种数据模型。相比之下，大多数数据库管理系统都围绕单一数据模型组织，该模型决定了数据的组织、存储和操作方式。文档、图、关系和键值模型是多模型数据库可能支持的数据模型的示例。

_Fauna is a flexible, developer-friendly, transactional database delivered as a secure and scalable cloud API with native GraphQL._
_Fauna 是一个灵活、对开发者友好、事务性的数据库，作为安全且可扩展的云 API 交付，具有原生 GraphQL 支持。_

Best for:
最适用于：

- You are not stuck on having to choose a data model
- 您不必局限于选择一种数据模型
- ACID Compliant
- 符合 ACID 标准
- Fast
- 快速
- No provisioning overhead
- 没有资源预置开销
- How do you want to consume your data and let the cloud do the heavy lifting
- 您想如何使用数据，并让云来完成繁重的工作

That is going to wrap up this database overview session, no matter what industry you are in you are going to come across one area of databases. We are then going to take some of these examples and look at the data management and in particular the protection and storing of these data services later on in the section.
本次数据库概述会议到此结束，无论您身处哪个行业，都会接触到数据库的某个领域。接下来，我们将在本节的后续内容中，利用其中一些示例来研究数据管理，特别是这些数据服务的保护和存储。

There are a ton of resources I have linked below, you could honestly spend 90 years probably deep diving into all database types and everything that comes with this.
我在下面链接了大量的资源，说实话，您可能需要花费 90 年的时间来深入研究所有数据库类型及其相关的一切。

## Resources

- [Redis Crash Course - the What, Why and How to use Redis as your primary database](https://www.youtube.com/watch?v=OqCK95AS-YE)
- [Redis: How to setup a cluster - for beginners](https://www.youtube.com/watch?v=GEg7s3i6Jak)
- [Redis on Kubernetes for beginners](https://www.youtube.com/watch?v=JmCn7k0PlV4)
- [Intro to Cassandra - Cassandra Fundamentals](https://www.youtube.com/watch?v=YjYWsN1vek8)
- [MongoDB Crash Course](https://www.youtube.com/watch?v=ofme2o29ngU)
- [MongoDB in 100 Seconds](https://www.youtube.com/watch?v=-bt_y4Loofg)
- [What is a Relational Database?](https://www.youtube.com/watch?v=OqjJjpjDRLc)
- [Learn PostgreSQL Tutorial - Full Course for Beginners](https://www.youtube.com/watch?v=qw--VYLpxG4)
- [MySQL Tutorial for Beginners [Full Course]](https://www.youtube.com/watch?v=7S_tz1z_5bA)
- [What is a graph database? (in 10 minutes)](https://www.youtube.com/watch?v=REVkXVxvMQE)
- [What is Elasticsearch?](https://www.youtube.com/watch?v=ZP0NmfyfsoM)
- [FaunaDB Basics - The Database of your Dreams](https://www.youtube.com/watch?v=2CipVwISumA)
- [Fauna Crash Course - Covering the Basics](https://www.youtube.com/watch?v=ihaB7CqJju0)

See you on [Day 86](day86.md)
我们下期在 [Day 86](day86.md) 再见
