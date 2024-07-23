---
layout: posts
title: Music from Nanomagnets
permalink: /magnetmusic/
classes: wide
author_profile: false

sidebar:
  - title: "Arthur Penty"
    text: '![styled-image](/assets/images/authorPic.png "😸"){: .align-left style="width: 70%;"}'  
  - text: 'Researcher in Unconventional & Natural Computation @ [NTNU](https://www.ntnu.edu/employees/arthur.penty){:target="_blank"}
              <br><br>[<i class="fa fa-fw fa-map-marker" aria-hidden="true"></i>Norway](https://www.google.com/maps/place/Norway/){:target="_blank"}
              <br><br>[<i class="fab fa-fw fa-github"></i>GitHub](https://github.com/arth4){:target="_blank"}
              <br><br><i class="fa fa-fw fa-envelope"/> neguhecragl@tbbtyrznvy.pbz (rot13)'
---
<style>
g { color: Chartreuse }
</style>



![cool visualisation](/assets/images/brainVoronoi.gif){: .align-right}
Often I find myself struck by the aesthetic beauty and *coolness* of a simulation/visualisation of nanomagnets. This caused me to think "I wonder if they can sound cool too?". Thus the creation of my tool [magnets2midi🎵](https://github.com/arth4/magnets2midi){:target="_blank"}, which takes the output of a nanomagnetic simulator ([flatspin🧲](https://flatspin.gitlab.io/){:target="_blank"}) and produces midi music (and even ugly sheet music!). 

With this I could produce the following music:

{% include video id="v8AmbKY1KOE" provider="youtube" %}

Here there are 3 separate Artificial Spin Ice (<g>ASI</g>), i.e. nanomagnetic systems, each creating their own stream of notes from their magnetic state. In this simulation the three ASIs are being thermally annealed, meaning they start at high temperature and are slowly cooled. This can be heard (and seen), by jumping through the video and noticing there is a lot of activity in the start less in the middle, and almost none by the end.


# Second Try with Evolution
Though the first attempt worked *quite* well, there was some cheating involved. Namely that the notes produced by the ASIs were snapped onto the major pentatonic scale. In this scale, pretty much just hitting random notes harmonises quite well, which is almost what is happening in the annealing. This gives a vey random unstructured sounding song. Furthermore, the geometries (arrangements of magnets) were chosen arbitrarily for looking cool and were found as part of a separate project (see: [Evolving Geometries](/evogeometry/)).

The goal was two-fold:
1. Stimulate the ASI in a less random way
2. Find a geometry *suited* for music making


![stimulus field](/assets/images/drivingFieldSmall.gif){: .align-left} 
To provide stimulus to the ASI, this time I applied a global magnetic field at an angle. Each step I would increase the angle by 23◦. This functioned as metronome, each tick giving the ASI the option to produce notes. The music is extracted by gridding the ASI and splitting into cells which are each assigned a different instrument to play, as such I named it my **<g>Nanomagnetic Orchestra.</g>**

![generating geometries](/assets/images/latticeDemo.gif){: .align-right} 
To find a geometry, I developed a means of generating lattice-based geometries and used an evolutionary algorithm to fine tune them. To evaluate the *musical fitness* of the geometries, I made a custom function to which the input is the magnetic dynamics produces by the ASI. The function outputs a score based on how *musical* it predicts the output will be. A more thorough description can be found in my paper: ([Evolving Music from a Self-Organising Nanomagnetic Orchestra](https://hdl.handle.net/11250/3115319){:target="_blank"}). The music uses the C major scale.

The outcome was the following piece of music:
{% include video id="3KPLQVp1uKk" provider="youtube" %}
The left shows the full evolved geometry, while the right indicates the macrospin assigned to each of the nine instruments. The music is much more structured this time, if a little repetitive. It reminds me somewhat of basic video game music, possibly as it seems to be treading water a constant level of musical tension. I particularly enjoy at around 40 seconds when there is a notable *phase transition* in the music, as if going from verse to chorus. I think further encouraging some verse/chorus/bridge-like structure in the music could be an interesting future direction for this work.    
