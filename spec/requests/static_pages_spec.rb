require 'spec_helper'

describe "StaticPages" do
  describe "Home GET static_pages_home_path" do   
    it "should have the title 'Home'" do
      visit static_pages_home_path
      page.should have_selector("title", :text => 'Home')
    end
    
    it "should have the content 'Home'" do
      visit static_pages_home_path
      page.should have_selector('h1', :text => "Welcome to TimeStamp")
    end
  end
  
  describe "About GET static_pages_about_path" do
    it "should have the title 'About'" do
      visit static_pages_about_path
      page.should have_selector("title", :text => 'About')
    end
    
    it "should have the content 'About'" do
      visit static_pages_about_path
      page.should have_selector("h1", :text => 'About')
    end
  end

  describe "Help GET static_pages_help_path" do
    it "should have the title 'Help'" do
      visit static_pages_help_path
      page.should have_selector("title", :text => 'Help')
    end
    
    it "should have the content 'Help'" do
      visit static_pages_help_path
      page.should have_selector('h1', :text => 'Help')
    end
  end  
end
