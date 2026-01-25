---
layout: posts
title: Gliders in Artificial Spin Ice
permalink: /gliders/
classes: wide
author_profile: false

sidebar:
  - title: "Arthur Penty"
    text: '![styled-image](/assets/images/authorPic.png "😸"){: .align-left style="width: 70%;"}'  
  - text: 'Researcher in Unconventional & Natural Computation @ [NTNU](https://www.ntnu.edu/employees/arthur.penty){:target="_blank"}
              <br><br>[<i class="fa fa-fw fa-map-marker" aria-hidden="true"></i>Norway](https://www.google.com/maps/place/Norway/){:target="_blank"}
              <br><br>[<i class="fab fa-fw fa-github"></i>GitHub](https://github.com/arth4){:target="_blank"}
              <br><br>[<i class="fa-solid fa-fw fa-envelope"></i>arthurpenty@googlemail.com](mailto:arthurpenty@googlemail.com){:target="_blank"}'
---

<style>
g { color: Chartreuse }
</style>


The term glider comes from the famous 2d Cellular Automata The Game of Life (<g>GoL</g>).  
![Standard GOL Glider ](/assets/images/gliderRecolour.gif){: .align-left}
Gliders are little structures, capable of traversing space without degrading. This property makes them perfect of information transmission when building complex machines in the GoL universe. Information transmission is a fundamental requirement of any computing system, making the problem of searching for glider-like behaviour in other media an interesting one.

## ASI 
![Standard GOL Glider ](/assets/images/astClockFast.gif){: .align-right}
Artificial Spin Ice (<g>ASI</g>) are systems of many interacting nanomagnets that have been studied for their physical properties and their promise as a future computing substrate. Using a novel field protocol know as [Astroid Clocking](https://doi.org/10.1038/s41467-024-45319-7){:target="_blank"}, the ASI can be stimulated in a way that causes step-wise growth or shrinkage. Astroid Clocking gives us 2 *growth fields* and 2 *shrink fields*. The animation on the right shows the effect of swapping between oscillating the growth fields and then the shrink fields.

## Searching for Gliders in ASI
For a system to move it has to grow and shrink at the same time. Which sounds strange, but imagine a blob that in one time-step grows on its left side while shrinking on its right side. This is the same as moving to the left. We will therefore interleave the growing and shrinking fields as our stimulus fields.

To find a glider we need two things: to find the field strengths that make gliding possible, and to find a structure capable of gliding.
TO do this I used an evolutionary algorithm to search for these parameters. I designed a fitness function to capture glider-behaviour by rewarding a constant amount of activation, and penalising frozen or oscillatory dynamics. The resulting **best solution** found through evolution is shown below:

![snake like glider in ASI](/assets/images/firstSnakeCut.gif){: .align-center}
We see an initial quite random state quickly collapse into this snake-like glider, which crawls along the ASI until it becomes close to the other edge and the edge interactions cause it to explode. The reason for the explosion is we have a much larger neighbourhood than in game of life, and as we approach the edge the balance of interactions is disrupted enough to cause the glider behaviour to stop.

## Playing with the snakes
There are a number of cool things we can do with these snake-like gliders. 
![growing and shrinking the snake](/assets/images/snakeGrwShrnkCrop.gif){: .align-right}
Pausing the application of negative fields and only applying the positive fields causes the snake to grow, while the opposite causes it to shrink. Here we are moving the head while freezing the tail or vice-versa. 

We can have many snakes occupying the same system:
![multisnake](/assets/images/staggerSnakes.gif){: .align-center}
Here we see the lowest snake's collision with the edge start an explosion that eventually envelopes all other snakes. We see an interesting pattern form as the explosion hits the second snake from the bottom. A convex structure is created that transmits itself to the right, almost like a meta-glider.

Finally, if we vertically flip the snake we can have it move in the opposite direction:
![multisnake](/assets/images/snakeBothWays.gif){: .align-center}
This is interesting as the same global fields are effecting all of the snakes, but the structure of the snakes causes them to move differently (rightwards or leftwards).
    