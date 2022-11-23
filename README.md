## Begin to use
1. **Set the environment**: Download the whole file pack. Create a new `.env` file, and add the following environment variables to this file:
   ```
   REACT_APP_FIREBASE_API_KEY=AIzaSyCjsV1an6ny8Wl80hZ8WXQAFi9dMkwxyi8
   REACT_APP_FIREBASE_AUTH_DOMAIN=cs5520-findmeow.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=cs5520-findmeow
   REACT_APP_FIREBASE_STORAGE_BUCKET=cs5520-findmeow.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=228457534053
   REACT_APP_FIREBASE_APP_ID=1:228457534053:web:80750c99d9a1363832ec8c
   REACT_APP_FIREBASE_MEASUREMENT_ID=G-FRD99ZP2JN
   REACT_APP_GOOGLE_MAP_APP_KEY=AIzaSyCwee2kdz90UKNlj8nnWGzJw70cAmu1MUo
   ```
   
2. **Installation**: Open the terminal in your IDE, and then enter `npm install` to the terminal.
3. **Load the App**: After installation, type `expo r` and press enter in the terminal. Now the App is ready to use!
4. **Reload the App**: If there is any loading issue, type `r` and press enter in the terminal to reload the App.
5. Due to some latent bugs, the App can somentimes be choking, especially for the filter component. This issue will be solved in the next iteration.
6. **Testing accounts**: For better experience, you can use our pre-prepared testing accounts, as follows. 
   ```
   Buyer account: buyer@admin.com, password: 123456
   Cattery account: cattery@admin.com, password: 123456
   ```
   Feel free to sign up for your own accounts! (But please do not try to enter any invalid characters, the input verification feature is still on the way:) 

## Iteration 1

### Contributions
**Group members**:
Cuichan Wu, Yuyan Lei, Zhongyi Lu.

**Cuichan Wu**:
1. Designed and implemented the CatInfomation screen.
2. Designed and implemented the discover-cat filter.(Use a slider bar component for the price column, and RBSheet for the filter feature)
3. Designed and implemented the find-breeder filter. (Use the RBSheet for the filter feature)
4. Designed the StarList screen.
5. Designed the UserProfile screen.

**Yuyan Lei**:
1. Designed the database structure, and implemented the firebase CRUD.
2. Built the navigation bar, and enabled it to display different menus to buyers / cattery owners. 
3. Built the login&signup screen, and implemented the authentication & registration feature.
4. Built the post screen, and implemented the post-new-cat feature. (Collect images, database CRUD and assign the cattery ID to this cat)
5. Implemented the star-a-cat feature. (Database CRUD, and auto-delete all related likes when deleting a cat, by using the observer&subscriber design pattern)
6. Built the profile screen, displayed an extra cattery-profile-page button for cattery owners, and implemented the logout feature.
7. Built the cattery profile screen, implemented the realtime display of profile information and available cats.
8. Built the updateCattery screen, and implemented the update-cattery-info feature. (Collect images, use the map API and database CRUD)
9. Implemented the realtime display on the cat card component. 
10. Implemented the realtime display on the cattery card component. 
11. Refined the layouts of the catCard component, FindBreeders screen and two filter components.
12. Wrote font loading functions.  

**Zhongyi Lu**:
1.


### Features, bugs, styling issues remaining to resolve in the next iteration

**Features to expect**:
1. Input verifications in each form.
2. Implement the display-nearby-cats feature on the DiscoverCat screen.
3. Implement the map feature for the discoverCat screen. 
4. Enable users to star a cattery.
5. Display the realtime cattery collection list.
6. Display available cats on the cattery profile screen.
7. Display th realtime cat infomation on the CatInfo screen.
9. Enable users to change their profile photos and passwords
10. Enable users to receive notifications when a nearby cat is posted. 

**Known Bugs**
1. Overloading issues in some screens and two filters.
2. When posting a new cat, the cat ID does not sutomatically assgined to the cattery ID.

**Styling issues**:
1. Require to unify all fonts and font sizes.
2. Require to unify style sheets.
3. Require to unify colors.

## ScreenShots
...

## Project Descriptions

**Find your favorite cat to join your family!**

FindMeow is an app designed for pet lovers to select and buy your favorite cats online without leaving home to start a life with pets! With online functions such as searching or filtering for available kittens, browsing and star favorite catteries, and viewing nearby available kittens or catteries, the app is a convenient platform for catteries to share information and for pet lovers to buy dream cats.
 

**Convenient and lightweight pet trading portal**

 Anytime, anywhere, you can view nearby pet trading information and shopping offers. Buying a cat is super easy!
 
**Coverage**

 Dozens of pet breeds in our app are sold. Pick up your favorite one!
 
**Pet community**

 You can obtain knowledge about pets and share your stories with your loved cats at any time.
 
**Seller certification**

 All pet sellers in our app are certified! Don’t worry about choosing a credible seller.
 


## Goals
In short, the application helps cat purchasers find and buy their favorite cats more easily and conveniently, and it helps cattery owners sell cats faster.

Specifically, in the United States, there are mainly three niches for the cat-trading market: unpaid or low cost adoptions, private sellers selling personally bred ones, and catteries selling high quality cats.

Our app is focused on the third niche market, which is the transaction of high quality cats from registered catteries. This market accounts for a large share of the U.S. cat transactions, but this market has never been looked at. 

Catteries are used to setting up their own web pages, uploading the information about available cats by themselves(often the information is not up to date), and relying on untimely emails to communicate with buyers. Accordingly, such buyers still have to search for information about the cats they want on countless catteries' untimely updated websites. 

The advent of our app will revolutionize their transactions, transforming an antiquated, complex, time-consuming, and delayed transaction process into a new, simple, and convenient real-time one.

## Advantages Over Competitors
Although there are many pet buying apps on the market, they share two major characteristics:

One is that they tend to encompass all types of pets. Although that choice makes these apps available to a broader audience, they are often hard to be perfect in either category.

Second, their main sellers tend to be rescue centers or private sellers. Rescue centers allow buyers to adopt cats for free or at a low cost, which is a great way to rescue animals. However, It is rather difficult for buyers who are interested in high quality cats to find their dream cats there. Cats sold by private sellers are at relatively low price, but private sellers do not have related qualifications to breed cats, nor do they have the knowledge and ability to scientifically breed and feed kittens. Therefore the breeding process may be unhealthy and the quality of cats often varies greatly.

Therefore, we choose to go for a platform that specializes in one category and focuses only on cattery transactions.

A dedicated category will allow us to work deeply in the cat buying area, improve the cat buying experience as much as possible, and also establish a brand in a single area faster. Focusing on cattery trading ensures that all cats on the platform are from scientific breeding and healthy feeding, having undergone a complete cat socialization process, and with beautiful looks and excellent pedigrees. All buyers who favor high quality cats can find the most suitable cats for them here.

Besides, our team want to turn the complex process, buying and selling cats, into a simple one. Therefore, we make our app a lightweight one with beautiful user interfaces and provide a charge-free platform to connect merchants and pet lovers. We did not choose to build a profit-oriented and complex application, carrying lots of additional features such as a pet supply mall, a pet community, or a pet dairy, but rather as a pure information-gathering and trading platform. We believe that this design will make our app a lightweight and elegant app. 
