<img src="public/logo_large.png?raw=true" alt="Quote Generator Logo" width="200"/>

Hai, this is a quote generator I'm building for personal use with danielsabbagh.com.

Here's what it looks like right now!  
<br />  
<img src="public/quote-generator-full.png?raw=true" style="margin:auto" alt="Quote Generator Logo" width="500"/>  
<br />
## Justification

I plan to create quote images regularly for [danielsabbagh.com](https://www.danielsabbagh.com). As a developer with a non-graphical and photography-aware background, I found that it would take me hours to create one quote image. This tool is an attempt to faciliate that process. I also wanted to flex some new-found and new-fangled frontend skills.

There are of course already standard tools for this kinda thing, Canva and Adobe Splash being pretty common. There are a few reasons I don't like using those tools:
- they always insert some sort of watermark
- the text manipulation functionalities are quite lacking
- I have to type in the quote for every image (at least, I haven't found a tool that lets me import a list of quotes)

To alleviate the first two issues, I'd resort to post-processing the file in GIMP, where I had to re-learn how to use layers, shading, etc. And I never found a solution for the third issue.

Another reason is to put into practice the frontend skills I hope to use regularly someday.

This brings us to a brief survey of the stack.

## Stack

### <img src="public/redux.png?raw=true" alt="Redux Logo" width="25"/> React and Redux Tooklit

We'd used Redux in a few production projects at my current job, but I didn't much like the file structure that Redux lends itself to, which requires having fifty files open to make a change across one 'slice' of the domain. Lo and behold, the Redux team released Redux toolkit some years back to address this very problem, plus a few others. The toolkit also removes the need for useless const actions, and puts all my store-specific code in one file.

### <img src="public/faunadb.png?raw=true" alt="Redux Logo" width="25"/> Fauna

I'd watched a few videos on FaunaDB, and thought it was way cool that it takes advantage of multiple database paradigms. I don't know GraphQL yet, but it seems rad that I can use Fauna for both my current document collection (which is for this app just a simple list of quotes, more below) as well as a future graph schema (is schema the right word here, or would it be implementation? hmm..)

As it turns out, fauna was so easy to integrate that I haven't touched it since I got it running. My use case is simply to retrieve a list of quotes I've uploaded to the server, and that took about an hour to figure out from start to back. The FQL threw me for a little loop, but my query was simple enough that I didn't have to learn too much upfront.

### <img src="public/tailwind.png?raw=true" alt="Redux Logo" width="25"/> Tailwind CSS

As with fauna, I'd watched a few YouTube videos on tailwind and was hit with the painful realization that I tweak CSS in my apps WAY TOO OFTEN. This is in large part a symptom of my lack of design skills and experience, i.e. I don't generally design the UIs for my side project apps upfront. In lieu of my forthcoming design skills, which don't exist in tangible coherent form yet, Tailwind is nice because I can just throw classes at my markup. I love the opinionated nature of the tool. It's been a bother in a few cases (it took quite a few minutes to figure out how to disable pulse animation on a disabled button), but the time-saving improvments are drastic. I imagine even the CSS pro would find it useful as a prototyping tool. So I'm taking the investment to learn it, which boils down to ⌘-K'ing all over their docs. I love it.

### <img src="public/unsplash.png?raw=true" alt="Redux Logo" width="25"/> Unsplash

What's a quote image generator without an actual image, right? For the images, I'm using Unsplash. Their javascript client is easy to set up, and the quality of their images is stunning. Simple enough. And free.

## UI/UX Approach

I'm stuck on how to model the user experience, because I'm having difficulty defining who the user is - is it me, or is it the general public?

So far from what I've written on this readme, it's definitely me. Writing a READMEs has been surprisingly helpful.

Now that we've clarified that I'm the primary audience, here are some points for consideration:
- if I have the option, I'll always use the keyboard shortcut. I don't mind buttons, of course, but would much prefer keymaps and bindings. So, those are a must.
- As the user of my own application, I want to make myself think and click as little as possible, so for those non-keyboard actions, such as loading the content, I'll make the app do as much of that work upfront.
- In the rare case of anyone else ever using this app, I still want it to be a pleasant experience for them.
- Plus, I want to work on those forthcoming design skills.

Here's the user progression I have in mind:
1. User navigates to the app.
2. On load, the app does two things:
    - hits the Fauna API to grab all the quotes in the 'quotes' collection¹
    - loads the first image from Unsplash²
3. User then can mix-and-match quote and background options using the controls, which are as follows:
    - the 'Quote' panel allows the user to:
        - select a random quote, 
        - cycle through all quotes with the 'prev' and 'next' controls,
        - move the quote up, down, left, right using the arrow buttons,
        - apply bold, italics, and underlined formatting, and
        - (eventually) to select one of the predetermined fonts (which will be sourced from Google fonts)
    - the 'Image' panel, which has the same 'prev', 'next', and 'random' features as the Quote panel

The Quote panel retains a positional and formatting history (because everything lives in Redux, woop woop), and the Image panel retains the urls of previously retrieved images.

## Problems and Todos

There is a _looong_ list of features I have yet to add to this app, some of which include:

* UI
    * keyboard controls
        * ooh and when the key command is pressed, show the corresponding button flash or trigger or ring
    * change font dynamically somehow
        * this will involve more tailwinding variant config, methinks
    * ensure responsive design
    * increase/decrease font size
    * download functionality that captures the image
    * unsplash link to image owner
    * add danielsabbagh.com watermark to downloaded image
* Code
    * stop exporting random crap all over the place in the slices
    * move the top and left percentage to the quote to retain positional history

As for problems, the biggest one right now is that I'm only storing the **url** of the image, so I have to re-fetch images that I've fetched before every time the user uses the prev and next controls. There's _gotta_ be a way to solve this, but I'm honeslty not sure exactly how to do that yet.

Welp, that's all folks. Hope this was an enjoyable README!




-------
1 - At some point in the future I might categorize the quotes, but for now it's just a big FAT list (FAT being the acronym for MSFT's now-defunct [File Allocation Table](https://en.wikipedia.org/wiki/File_Allocation_Table), which is itself a fat linked list of every segmented memory location in the file system. This is not very important, I just wanted to use FAT as a pun).

2 - I'm not loading a batch of images from Unsplash because I don't want to apply for a production-level license, which costs money. I'm on the free tier, which means I only get fifty requests per hour, so I have to use each request sparingly.
