---
title: '#90DaysOfDevOps - Microsoft Azure Security Models - Day 30'
published: false
description: 90DaysOfDevOps - Microsoft Azure Security Models
tags: 'devops, 90daysofdevops, learning'
cover_image: null
canonical_url: null
id: 1049039
---

## Microsoft Azure Security Models

Following on from the Microsoft Azure Overview, we are going to start with Azure Security and see where this can help in our day to day.
在完成了微软 Azure 概览之后，我们将开始学习 Azure 安全性，并了解它如何帮助我们的日常工作。
For the most part, I have found the built-in roles have been sufficient but knowing that we can create and work with many different areas of authentication and configurations.
在大多数情况下，我发现内置角色已经足够使用，但了解我们可以创建和使用许多不同的身份验证和配置领域是很重要的。
I have found Microsoft Azure to be quite advanced with its Active Directory background compared to other public clouds.
与其它公共云相比，我发现 Microsoft Azure 凭借其 Active Directory 背景显得相当先进。

This is one area in which Microsoft Azure seemingly works differently from other public cloud providers, in Azure there is ALWAYS Azure AD.
这是 Microsoft Azure 看起来与其它公共云提供商工作方式不同的一个领域：在 Azure 中，总是存在 Azure AD。

### Directory Services

- Azure Active Directory hosts the security principles used by Microsoft Azure and other Microsoft cloud services.
- Azure Active Directory 托管着 Microsoft Azure 和其它微软云服务使用的安全主体。
- Authentication is accomplished through protocols such as SAML, WS-Federation, OpenID Connect and OAuth2.
- 身份验证是通过 SAML、WS-Federation、OpenID Connect 和 OAuth2 等协议完成的。
- Queries are accomplished through REST API called Microsoft Graph API.
- 查询是通过称为 Microsoft Graph API 的 REST API 完成的。
- Tenants have a tenant.onmicrosoft.com default name but can also have custom domain names.
- 租户有一个默认名称 tenant.onmicrosoft.com，但也可以拥有自定义域名。
- Subscriptions are associated with an Azure Active Directory tenant.
- 订阅与 Azure Active Directory 租户相关联。

If we think about AWS to compare the equivalent offering would be AWS IAM (Identity & Access Management) Although still very different
如果我们考虑 AWS 来比较等效产品，那将是 AWS IAM（身份与访问管理），尽管它们仍然非常不同。

Azure AD Connect provides the ability to replicate accounts from AD to Azure AD.
Azure AD Connect 提供了将帐户从 AD 复制到 Azure AD 的能力。
This can also include groups and sometimes objects.
这也可以包括组和有时包括对象。
This can be granular and filtered.
这可以是细粒度和可筛选的。
Supports multiple forests and domains.
支持多个林和域。

It is possible to create cloud accounts in Microsoft Azure Active Directory (AD) but most organisations already have accounted for their users in their own Active Directory being on-premises.
虽然可以在 Microsoft Azure Active Directory (AD) 中创建云帐户，但大多数组织已经在其本地 Active Directory 中为其用户设置了帐户。

Azure AD Connect also allows you to not only see Windows AD servers but also other Azure AD, Google and others.
Azure AD Connect 不仅允许您查看 Windows AD 服务器，还可以查看其它 Azure AD、Google 等。
This also provides the ability to collaborate with external people and organisations this is called Azure B2B.
这还提供了与外部人员和组织协作的能力，这称为 Azure B2B。

Authentication options between Active Directory Domain Services and Microsoft Azure Active Directory are possible with both identity sync with a password hash.
Active Directory Domain Services 和 Microsoft Azure Active Directory 之间的身份验证选项可以通过身份同步和密码哈希来实现。

![](Images/Day30_Cloud1.png)

The passing of the password hash is optional, if this is not used then pass-through authentication is required.
密码哈希的传递是可选的，如果未使用此选项，则需要直通身份验证。

There is a video linked below that goes into detail about Passthrough authentication.
下面有一个链接的视频，详细介绍了直通身份验证。

[User sign-in with Azure Active Directory Pass-through Authentication](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-pta)

![](Images/Day30_Cloud2.png)

### Federation

It's fair to say that if you are using Microsoft 365, Microsoft Dynamics and on-premises Active Directory it is quite easy to understand and integrate into Azure AD for federation.
公平地说，如果您正在使用 Microsoft 365、Microsoft Dynamics 和本地 Active Directory，那么将它们集成到 Azure AD 进行联合认证是相当容易理解的。
However, you might be using other services outside of the Microsoft ecosystem.
但是，您可能正在使用微软生态系统之外的其它服务。

Azure AD can act as a federation broker to these other Non-Microsoft apps and other directory services.
Azure AD 可以作为这些非微软应用和其它目录服务的联合代理。

This will be seen in the Azure Portal as Enterprise Applications of which there are a large number of options.
这将在 Azure 门户中显示为“企业应用程序”（Enterprise Applications），其中有大量的选项。

![](Images/Day30_Cloud3.png)

If you scroll down on the enterprise application page you are going to see a long list of featured applications.
如果您在企业应用程序页面向下滚动，您将看到一长串特色应用程序。

![](Images/Day30_Cloud4.png)

This option also allows for "bring your own" integration, an application you are developing or a non-gallery application.
此选项还允许“自带”（bring your own）集成，即您正在开发的应用程序或非应用商店（non-gallery）应用程序。

I have not looked into this before but I can see that this is quite the feature set when compared to the other cloud providers and capabilities.
我以前没有研究过这一点，但与其它云提供商和功能相比，我可以看到这是一个相当完整的功能集。

### Role-Based Access Control

We have already covered on [Day 29](day29.md) the scopes we are going to cover here, we can set our role-based access control according to one of these areas.
我们已经在 [第 29 天](day29.md) 介绍了我们将在此处涵盖的范围，我们可以根据以下其中一个领域设置基于角色的访问控制。

- Subscriptions
- 订阅
- Management Group
- 管理组
- Resource Group
- 资源组
- Resources
- 资源

Roles can be split into three, there are many built-in roles in Microsoft Azure. Those three are:
角色可以分为三种，Microsoft Azure 中有许多内置角色。这三种是：

- Owner
- 所有者
- Contributor
- 参与者
- Reader
- 读取者

Owner and Contributor are very similar in their boundaries of scope however the owner can change permissions.
所有者和参与者在范围边界上非常相似，但所有者可以更改权限。

Other roles are specific to certain types of Azure Resources as well as custom roles.
其它角色特定于某些类型的 Azure 资源以及自定义角色。

We should focus on assigning permissions to groups vs users.
我们应该专注于将权限分配给组，而不是分配给用户。

Permissions are inherited.
权限是继承的。

If we go back and look at the "90DaysOfDevOps" Resource group we created and check the Access Control (IAM) within you can see we have a list of contributors and a customer User Access Administrator, and we do have a list of owners (But I cannot show this)
如果我们回头查看我们创建的“90DaysOfDevOps”资源组并检查其中的访问控制 (IAM)，您可以看到我们有一个参与者列表和一个自定义的用户访问管理员 (User Access Administrator)，我们确实也有一个所有者列表（但我无法显示此内容）。

![](Images/Day30_Cloud5.png)

We can also check the roles we have assigned here if they are BuiltInRoles and which category they fall under.
我们还可以检查我们在此处分配的角色，判断它们是否是内置角色以及它们属于哪个类别。

![](Images/Day30_Cloud6.png)

We can also use the check access tab if we want to check an account against this resource group and make sure that the account we wish to have that access to has the correct permissions or maybe we want to check if a user has too much access.
如果我们想针对此资源组检查某个帐户，确保我们希望拥有该访问权限的帐户具有正确的权限，或者我们想检查某个用户是否拥有太多访问权限，我们可以使用“检查访问权限”选项卡。

![](Images/Day30_Cloud7.png)

### Microsoft Defender for Cloud

- Microsoft Defender for Cloud (formerly known as Azure Security Center) provides insight into the security of the entire Azure environment.
- Microsoft Defender for Cloud（以前称为 Azure 安全中心）提供了对整个 Azure 环境安全性的深入了解。
- A single dashboard for visibility into the overall security health of all Azure and non-Azure resources (via Azure Arc) and security hardening guidance.
- 它提供了一个单一仪表板，用于查看所有 Azure 和非 Azure 资源（通过 Azure Arc）的整体安全状况和安全强化指导。
- Free tier includes continuous assessment and security recommendations.
- 免费层包括持续评估和安全建议。
- Paid plans for protected resource types (e.g. Servers, AppService, SQL, Storage, Containers, KeyVault).
- 受保护资源类型（例如服务器、AppService、SQL、存储、容器、KeyVault）需要付费计划。

I have switched to another subscription to view the Azure Security Center and you can see here based on very few resources that I have some recommendations in one place.
我已切换到另一个订阅来查看 Azure 安全中心，您可以看到，基于非常少的资源，我有一些建议集中在一个地方。

![](Images/Day30_Cloud8.png)

### Azure Policy

- Azure Policy is an Azure native service that helps to enforce organizational standards and assess compliance at scale.
- Azure Policy 是一项 Azure 本机服务，有助于大规模实施组织标准和评估合规性。
- Integrated into Microsoft Defender for Cloud. Azure Policy audits non-compliant resources and applies remediation.
- 它集成到 Microsoft Defender for Cloud 中。Azure Policy 审核不合规的资源并应用修正措施。
- Commonly used for governing resource consistency, regulatory compliance, security, cost, and management standards.
- 常用于管理资源一致性、法规遵从性、安全性、成本和管理标准。
- Uses JSON format to store evaluation logic and determine whether a resource is compliant or not, and any actions to take for non-compliance (e.g. Audit, AuditIfNotExists, Deny, Modify, DeployIfNotExists).
- 它使用 JSON 格式存储评估逻辑，并确定资源是否合规，以及对不合规资源采取的任何操作（例如 Audit、AuditIfNotExists、Deny、Modify、DeployIfNotExists）。
- Free for use. The exception is Azure Arc connected resources charged per server/month for Azure Policy Guest Configuration usage.
- 免费使用。例外情况是 Azure Arc 连接的资源，Azure Policy 客户配置的使用按服务器/月收费。

### Hands-On

I have gone out and I have purchased www.90DaysOfDevOps.com and I would like to add this domain to my Azure Active Directory portal, [Add your custom domain name using the Azure Active Directory Portal](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/add-custom-domain)
我出去购买了 www.90DaysOfDevOps.com，我想将此域添加到我的 Azure Active Directory 门户中，请参考[使用 Azure Active Directory 门户添加自定义域名](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/add-custom-domain)。

![](Images/Day30_Cloud9.png)

With that now, we can create a new user on our new Active Directory Domain.
现在，我们可以在新的 Active Directory 域上创建一个新用户。

![](Images/Day30_Cloud10.png)

Now we want to create a group for all of our new 90DaysOfDevOps users in one group.
现在我们想为所有新的 90DaysOfDevOps 用户创建一个组。
We can create a group as per the below, notice that I am using "Dynamic User" which means Azure AD will query user accounts and add them dynamically vs assigned which is where you manually add the user to your group.
我们可以按照下图创建组，请注意，我使用的是“动态用户”（Dynamic User），这意味着 Azure AD 将查询用户帐户并动态添加它们，而不是使用“分配”（assigned），后者需要您手动将用户添加到组中。

![](Images/Day30_Cloud11.png)

There are lots of options when it comes to creating your query, I plan to simply find the principal name and make sure that the name contains @90DaysOfDevOps.com.
创建查询时有很多选项，我计划简单地查找主体名称并确保该名称包含 @90DaysOfDevOps.com。

![](Images/Day30_Cloud12.png)

Now because we have created our user account already for michael.cade@90DaysOfDevOps.com we can validate the rules are working.
现在，因为我们已经为 michael.cade@90DaysOfDevOps.com 创建了用户帐户，我们可以验证规则是否有效。
For comparison I have also added another account I have associated to another domain here and you can see that because of this rule our user will not land in this group.
为了进行比较，我还在其中添加了另一个与其它域关联的帐户，您可以看到，由于此规则，我们的用户不会落入此组中。

![](Images/Day30_Cloud13.png)

I have since added a new user1@90DaysOfDevOps.com and if we go and check the group we can see our members.
我随后添加了一个新用户 user1@90DaysOfDevOps.com，如果我们去检查该组，我们可以看到我们的成员。

![](Images/Day30_Cloud14.png)

If we have this requirement x100 then we are not going to want to do this all in the console we are going to want to take advantage of either bulk options to create, invite, and delete users or you are going to want to look into PowerShell to achieve this automated approach to scale.
如果我们将这个需求放大 100 倍，那么我们将不会希望全部在控制台中完成这些操作，我们会希望利用批量选项来创建、邀请和删除用户，或者您可能需要研究 PowerShell 来实现这种自动化扩展方法。

Now we can go to our Resource Group and specify that on the 90DaysOfDevOps resource group we want the owner to be the group we just created.
现在我们可以转到我们的资源组，并指定在 90DaysOfDevOps 资源组上，我们希望所有者是我们刚刚创建的那个组。

![](Images/Day30_Cloud15.png)

We can equally go in here and deny assignments access to our resource group as well.
我们也可以在这里进入并拒绝分配对我们资源组的访问权限。

Now if we log in to the Azure Portal with our new user account, you can see that we only have access to our 90DaysOfDevOps resource group and not the others seen in previous pictures because we do not have the access.
现在，如果我们使用新用户帐户登录 Azure 门户，您可以看到我们只能访问我们的 90DaysOfDevOps 资源组，而无法访问前面图片中看到过的其它资源组，因为我们没有相应的访问权限。

![](Images/Day30_Cloud16.png)

The above is great if this is a user that has access to resources inside of your Azure portal, not every user needs to be aware of the portal, but to check access we can use the [Apps Portal](https://myapps.microsoft.com/) This is a single sign-on portal for us to test.
如果这是一个可以访问 Azure 门户内资源的用户，那么上述功能非常棒，但并非所有用户都需要了解门户，要检查访问权限，我们可以使用 [应用门户](https://myapps.microsoft.com/)（Apps Portal），这是一个供我们测试的单点登录门户。

![](Images/Day30_Cloud17.png)

You can customise this portal with your branding and this might be something we come back to later on.
您可以使用自己的品牌定制此门户，这可能是我们稍后会回顾的内容。

## Resources

- [Hybrid Cloud and MultiCloud](https://www.youtube.com/watch?v=qkj5W98Xdvw)
- [Microsoft Azure Fundamentals](https://www.youtube.com/watch?v=NKEFWyqJ5XA&list=WL&index=130&t=12s)
- [Google Cloud Digital Leader Certification Course](https://www.youtube.com/watch?v=UGRDM86MBIQ&list=WL&index=131&t=10s)

See you on [Day 31](day31.md)
我们第 31 天再见。