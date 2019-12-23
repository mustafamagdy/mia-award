// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.




$(document).ready(function () {
    var modalBox = $('#userStatusConfirmation');
    $('body').on('click','.updateStatus', function (e) {
        e.preventDefault();
        modalBox.modal('show');
        var userId = $(this).find('#userName').val();
        modalBox.find('.modal-footer button').on('click', function (e) {
            var $button = $(e.target);
            if ($button[0].id == 'procceed') {
                $.ajax({
                    url: '/Users/ToggleStatus/' + userId,
                    type: 'POST',
                    data: { UserName: userId },
                    success: function (response) {
                        window.location.reload(true);
                    }
                })
            }
        });
    })

  $('#users').DataTable({
        language: {
          searchPlaceholder: "Search By Name, Email, Role..."
        },
        ajax: {
            "processing": true,
            "serverSide": true,
            url: '/Users/all-users',
        },
        columns: [
            { data: 'firstName'},
            { data: 'lastName' },
            { data: 'email' },          
            { data: 'role' },
            { data: null },
        ],
        columnDefs: [
            {
                "targets": -1,
                "data": "enabled",
                "render": function (data, type, row, meta) {
                    var htmlOuput = [
                        '<label class="switch updateStatus">',
                            '<input type="hidden" value=' + data.email +' id="userName" />',
                            '<input type="checkbox" '+ (data.enabled == true ? "checked" : "") +' />',
                            '<span class="slider round"></span>',
                        '</label>'
                    ].join('\n');
                    return htmlOuput;
                }
            }

        ]
    });
});

