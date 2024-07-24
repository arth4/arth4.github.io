---
layout: posts
title: Evolving Patterns of Nanomagnets
permalink: /evogeometry/
classes: wide
author_profile: false

sidebar:
  - title: "Arthur Penty"
    text: '![styled-image](/assets/images/authorPic.png "😸"){: .align-left style="width: 70%;"}'  
  - text: 'Researcher in Unconventional & Natural Computation @ [NTNU](https://www.ntnu.edu/employees/arthur.penty){:target="_blank"}
              <br><br>[<i class="fa fa-fw fa-map-marker" aria-hidden="true"></i>Norway](https://www.google.com/maps/place/Norway/){:target="_blank"}
              <br><br>[<i class="fab fa-fw fa-github"></i>GitHub](https://github.com/arth4){:target="_blank"}
              <br><br><i class="fa fa-fw fa-envelope"/> neguhecragl@tbbtyrznvy.pbz (rot13)'

gallery:
  - image_path: /assets/images/squareGrow.gif
    alt: "growing square ASI"
  - image_path: /assets/images/pinGrow.gif
    alt: "growing pinwheel ASI"
  - image_path: /assets/images/kagGrow.gif
    alt: "growing kagome ASI"

gallery2:
  - image_path: /assets/images/tileDeformPatrol.gif
    alt: "smooth mutation of tile"
  - image_path: /assets/images/asiDeformPatrol.gif
    alt: "smooth mutation of asi"

gallery3:
  - image_path: /assets/images/evogeometry/geom1_neg.gif
    alt: "example geometry 1"
  - image_path: /assets/images/evogeometry/geom2_neg.gif
    alt: "example geometry 2"
  - image_path: /assets/images/evogeometry/geom3_neg.gif
    alt: "example geometry 3"
  - image_path: /assets/images/evogeometry/geom4_neg.gif
    alt: "example geometry 4"
  - image_path: /assets/images/evogeometry/geom5_neg.gif
    alt: "example geometry 5"
  - image_path: /assets/images/evogeometry/geom6_neg.gif
    alt: "example geometry 6"
  - image_path: /assets/images/evogeometry/geom7_neg.gif
    alt: "example geometry 7"
  - image_path: /assets/images/evogeometry/geom8_neg.gif
    alt: "example geometry 8"
  - image_path: /assets/images/evogeometry/geom9_neg.gif
    alt: "example geometry 9"
    
---
<style>
g { color: Chartreuse }
r { color: Red }
</style>

Artificial Spin Ice (<g>ASI</g>) are systems of many interacting nanomagnets typically arranged in some 2d pattern. As ASI came from material physics and the study of interactions on a crystalline structure, the ASI geometries tend to be <r>regular lattices</r>. 
![boring lattices](/assets/images/evogeometry/exampleGeoms.png){: .align-center}
I found these lattices to be a bit boring and wanted to explore a much vaster set of ASI geometries, free from a grid. We could of course just randomly place magnets, but there would be no complexity or structure. Evolutionary Algorithms (<g>EAs</g>) are a powerful tool for exploring and searching for things in hard to traverse search-spaces. As such I wanted a new representation for ASI geometries that could represent many complex irregular patterns, and be suitable for EAs.

In my representation ASI geometries are represented as one or more (*<g>Tiles</g>*). Each Tile contains exactly two magnets, on in the centre and one anywhere else. We can then (<g>grow</g>) geometries by starting from one magnet repeatedly applying the tiles. To apply the tile we copy it and try to place it some where in the geometry such that its centre magnet perfectly overlaps a magnet in the tile. Below we see this process for the square ASI.

![building square geometry](/assets/images/sqrAsi_trans.gif){: .align-center style="width: 50%; transform:rotate(90deg);"}

Note that we can rotate tiles but <r>not</r> flip them. Using this method we can grow all all of the basic geometries (Square, Pinwheel and Kagome) using only one Tile each.
{% include gallery %}

Each of these geometries is represented by one tile, meaning we can smoothly mutate from one to another by modifying the position of the second magnet in the tile. This is an important property that is exploited by EAs to search for new things.
{% include gallery id="gallery2" %}

So far we have only seen systems built with one tile. By scaling up the number of tiles we scale up the complexity of the representation, allowing from much more complex geometries.
{% include gallery id="gallery3" %}

As the representation is generative (it grows) we can allow the systems to grow to large sizes. Though some systems will self-regulate and converge to a maximum size.


<figure>
    <p style="text-align:center;">
        <img src="/assets/images/evogeometry/biggererAsiGrowFast.gif" alt="growing very big geometry" style="width: 70%;">
    </p>
</figure>

For a more detailed explanation of this process or to see in in action, searching for geometries with certain features, see my publications: 
 - [A Representation of Artificial Spin Ice for Evolutionary Search.](https://direct.mit.edu/isal/proceedings-abstract/isal/33/99/102944)

 - [Evolving Artificial Spin Ice for Robust Computation](https://hdl.handle.net/11250/3132921)
