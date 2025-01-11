const sendData = require('./customs/upload_button.js');
const uiHandler = require('./customs/newUI');

const buttons = require('./ui/mode_buttons'),
  file_bar = require('./ui/file_bar'),
  dnd = require('./ui/dnd'),
  layer_switch = require('./ui/layer_switch'),
  projection_switch = require('./ui/projection_switch');

module.exports = ui;

function ui(context) {
  function init(selection) {
    const container = selection
      .append('div')
      .attr(
        'class',
        'ui-container grow flex-shrink-0 flex flex-col md:flex-row w-full relative overflow-x-hidden'
      );
    // Add the toolbar
    const map = container
      .append('div')
      .attr('id', 'map')
      .attr(
        'class',
        'map grow shrink-0 top-0 bottom-0 left-0 basis-0 transition-all duration-300'
      )
      .call(layer_switch(context))
      .call(projection_switch(context));

    // Sidebar handle
    map
      .append('div')
      .attr(
        'class',
        'sidebar-handle absolute right-0 bottom-9 px-4 bg-white cursor-pointer hidden md:block z-10'
      )
      .attr('title', 'Toggle Sidebar')
      .on('click', () => {
        const collapsed = !d3.select('.map').classed('md:basis-full');
        d3.select('.map').classed('md:basis-0', !collapsed);
        d3.select('.map').classed('md:basis-full', collapsed);

        d3.select('.sidebar-handle-icon')
          .classed('fa-caret-left', collapsed)
          .classed('fa-caret-right', !collapsed);

        setTimeout(() => {
          context.map.resize();
        }, 300);
      })
      .append('i')
      .attr('class', 'sidebar-handle-icon fa-solid fa-caret-right');

    context.container = container;

    return container;
  }

  function render(selection) {
    const container = init(selection);

    // Hide all elements except the map
    container.selectAll('*').classed('hiddenXYZ', true); // Hide all child elements
    container.select('#map').classed('hiddenXYZ', false); // Show the map

    // Add Upload Button
    const uploadButton = container
      .append('div')
      .text('Upload Data')
      .on('click', () => {
        console.log('Upload button clicked');
        sendData(context);
      })
      .style('position', 'fixed')
      .style('top', '10px')
      .style('left', '10px')
      .style('background-color', '#007bff')
      .style('color', 'white')
      .style('padding', '10px 20px')
      .style('border', 'none')
      .style('border-radius', '5px')
      .style('cursor', 'pointer')
      .style('text-align', 'center')
      .style('display', 'inline-block')
      .style('font-size', '16px')
      .style('transition', 'background-color 0.3s')
      .style('z-index', '1000');

    uploadButton.on('mouseover', function () {
      d3.select(this).style('background-color', '#0056b3');
    }).on('mouseout', function () {
      d3.select(this).style('background-color', '#007bff');
    });

    // Add Input Field and Submit Button
    const inputContainer = container
      .append('div')
      .style('position', 'fixed')
      .style('top', '60px')
      .style('left', '10px')
      .style('z-index', '1000')
      .style('display', 'flex')
      .style('gap', '10px')
      .style('align-items', 'center');

    const inputField = inputContainer
      .append('input')
      .attr('type', 'text')
      .attr('placeholder', 'Enter your data')
      .style('padding', '10px')
      .style('font-size', '16px')
      .style('border', '1px solid #ccc')
      .style('border-radius', '5px')
      .style('flex', '1');

    const submitButton = inputContainer
      .append('div')
      .text('Submit Data')
      .on('click', () => {
        const userInput = inputField.property('value');
        if (!userInput) {
          console.error('Input field is empty.');
          return;
        }
        console.log('Submitting user input:', userInput);

        // Prepare data context
        const dataContext = {
          data: new Map([
            ['map', userInput], // Mock map data
            ['meta', { description: 'User submitted data' }],
          ]),
        };

        // Send user input to Firebase
        sendData(dataContext);

        // Clear input field after submission
        inputField.property('value', '');
      })
      .style('background-color', '#28a745')
      .style('color', 'white')
      .style('padding', '10px 20px')
      .style('border', 'none')
      .style('border-radius', '5px')
      .style('cursor', 'pointer')
      .style('text-align', 'center')
      .style('font-size', '16px')
      .style('transition', 'background-color 0.3s');

    submitButton.on('mouseover', function () {
      d3.select(this).style('background-color', '#218838');
    }).on('mouseout', function () {
      d3.select(this).style('background-color', '#28a745');
    });

    const right = container
      .append('div')
      .attr(
        'class',
        'right flex flex-col overflow-x-hidden bottom-0 top-0 right-0 box-border bg-white relative grow-0 shrink-0 w-full md:w-2/5 md:max-w-md h-2/5 md:h-auto'
      );

    const top = right
      .append('div')
      .attr('class', 'top border-b border-solid border-gray-200');

    const pane = right.append('div').attr('class', 'pane group');

    top
      .append('div')
      .attr('class', 'buttons flex')
      .call(buttons(context, pane));

    container
      .append('div')
      .attr('class', 'file-bar hidden md:block')
      .call(file_bar(context));

    dnd(context);
    context.map();
  }

  return {
    read: init,
    write: render,
  };
}
