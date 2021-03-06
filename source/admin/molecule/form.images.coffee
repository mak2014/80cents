"use strict"

Atoms.Molecule.Form.available.push "Atom.Progress"
Atoms.Molecule.Form.available.push "Atom.Figure"
Atoms.Molecule.Form.available.push "Molecule.Div"

class Atoms.Molecule.Images extends Atoms.Molecule.Form

  @events: ["add", "destroy"]

  @default:
    entity : undefined
    children: [
      "Atom.Input": id: "file", type: "file", events: ["change"], callbacks: ["onFileChange"]
    ,
      "Molecule.Div": id: "images"
    ,
      "Atom.Figure": id: "add", style: "add", events: ["touch"], callbacks: ["onAdd"]
    ,
      "Atom.Progress": id: "progress", style : "tiny", value: 0
    ]

  constructor: ->
    super
    @attributes.files = []

  value: (@entity) =>
    if @entity?
      @attributes.files = []
      @images.destroyChildren()
      @_addImage file for file in (@entity.images or [])
    else
      @attributes.files

  # Bubble Children Events
  onAdd: (event) ->
    @file.el.trigger "click"
    false

  onDestroy: (event, atom) ->
    @progress.value 0
    parameters =
      file  : atom.attributes.file
      id    : @entity.id
      entity: @entity.constructor.name
    @progress.value 50
    __.proxy("DELETE", "image", parameters, background = true).then (error, response) =>
      @progress.el.hide()
      @progress.value 0
      unless error
        atom.destroy()
        @attributes.files.splice @attributes.files.indexOf(atom.attributes.file), 1
    false

  onFileChange: (event) ->
    event.stopPropagation()
    event.preventDefault()
    file_url = event.target.files[0]
    if file_url.type.match /image.*/
      @progress.value 0
      @progress.el.show()
      callbacks =
        progress: (progress) =>
          @progress.value progress.position / progress.total * 100
        error: =>
          alert "upload error!!"
        abort: =>
          alert "upload aborted"

      parameters =
        file  : file_url
        id    : @entity.id
        entity: @entity.constructor.name
      @progress.value 50
      __.multipart("POST", "/api/image", parameters, callbacks).then (error, file) =>
        @progress.el.hide()
        @progress.value 0
        @_addImage file.name unless error
    false

  _addImage: (file) ->
    @attributes.files.push file
    @images.appendChild "Atom.Figure",
      url       : "#{__.host}uploads/#{file}"
      file      : file
      events    : ["touch"]
      callbacks : ["onDestroy"]
